import { json, supabaseFetch, validPassword, type Env } from "../../_lib/sante";

interface Context { request: Request; env: Env; }

interface Measurement {
  analyte: string;
  value_numeric: number;
  unit: string;
  reference_low: number | null;
  reference_high: number | null;
  reference_text: string | null;
  abnormality: string | null;
  notes: string | null;
  exam: { exam_date: string; laboratory: string | null; notes: string | null };
}

function inRange(point: Measurement): boolean {
  return (point.reference_low === null || point.value_numeric >= point.reference_low)
    && (point.reference_high === null || point.value_numeric <= point.reference_high);
}

async function generateAnalysis(env: Env, marker: { analyte: string; unit: string; points: Measurement[] }): Promise<string> {
  const latest = marker.points.at(-1)!;
  const previous = marker.points.at(-2) ?? null;
  const facts = {
    marker: marker.analyte,
    unit: marker.unit,
    latest: {
      value: latest.value_numeric, date: latest.exam.exam_date, laboratory_reference: latest.reference_text,
      reference_low: latest.reference_low, reference_high: latest.reference_high, laboratory_flag: latest.abnormality,
      is_within_reference: inRange(latest), context: latest.notes ?? latest.exam.notes,
    },
    previous: previous && { value: previous.value_numeric, date: previous.exam.exam_date },
    history: marker.points.map((point) => ({ date: point.exam.exam_date, value: point.value_numeric })),
  };
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: env.OPENAI_MODEL || "gpt-5-mini",
      input: [
        { role: "system", content: "Tu rédiges une synthèse française de biomarqueur pour un tableau de suivi personnel. Utilise uniquement les faits fournis. Deux ou trois phrases, 65 mots maximum, ton médical simple, précis et calme. Ne pose pas de diagnostic, n'affirme pas de cause, ne recommande aucun traitement ni supplément. Mentionne la dernière valeur, sa position par rapport à la référence du laboratoire, et l'évolution si une comparaison existe. Si une valeur est hors plage, indique simplement qu'elle mérite d'être remise en contexte avec le médecin. Réponds en texte brut, sans titre ni liste." },
        { role: "user", content: JSON.stringify(facts) },
      ],
      temperature: 0.2,
      max_output_tokens: 180,
    }),
  });
  if (!response.ok) throw new Error(`OpenAI a renvoyé ${response.status}.`);
  const payload = await response.json() as { output_text?: string };
  const analysis = payload.output_text?.trim();
  if (!analysis) throw new Error("OpenAI n'a renvoyé aucun texte exploitable.");
  return analysis;
}

export const onRequestPost = async ({ request, env }: Context): Promise<Response> => {
  const token = request.headers.get("x-health-sync-token");
  if (!await validPassword(token, env.HEALTH_SYNC_TOKEN || "")) return json({ error: "Non autorisé." }, { status: 401 });
  if (!env.OPENAI_API_KEY) return json({ error: "OPENAI_API_KEY manque." }, { status: 500 });

  const measurementsResponse = await supabaseFetch(env, "health_measurements?select=analyte,value_numeric,unit,reference_low,reference_high,reference_text,abnormality,notes,exam:health_exams!inner(exam_date,laboratory,notes)&value_numeric=not.is.null&order=created_at.asc");
  if (!measurementsResponse.ok) return json({ error: "Impossible de lire les mesures." }, { status: 502 });

  const groups = new Map<string, { analyte: string; unit: string; points: Measurement[] }>();
  for (const measurement of await measurementsResponse.json() as Measurement[]) {
    if (!measurement.unit || !measurement.exam?.exam_date) continue;
    const key = `${measurement.analyte}::${measurement.unit}`;
    if (!groups.has(key)) groups.set(key, { analyte: measurement.analyte, unit: measurement.unit, points: [] });
    groups.get(key)!.points.push(measurement);
  }

  const latestDate = Math.max(...[...groups.values()].flatMap((marker) => marker.points.map((point) => new Date(`${point.exam.exam_date}T12:00:00`).getTime())));
  const recentCutoff = latestDate - 365 * 24 * 60 * 60 * 1000;
  const markers = [...groups.values()].filter((marker) => marker.points.length >= 2 || new Date(`${marker.points.at(-1)!.exam.exam_date}T12:00:00`).getTime() >= recentCutoff);
  const results = await Promise.allSettled(markers.map(async (marker) => {
    const analysis = await generateAnalysis(env, marker);
    const latest = marker.points.at(-1)!;
    const write = await supabaseFetch(env, "health_marker_analyses?on_conflict=analyte,unit", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({
        analyte: marker.analyte, unit: marker.unit, analysis, source_exam_date: latest.exam.exam_date,
        model: env.OPENAI_MODEL || "gpt-5-mini", prompt_version: "v1",
        facts: { latest: latest.value_numeric, previous: marker.points.at(-2)?.value_numeric ?? null, points: marker.points.length },
      }),
    });
    if (!write.ok) throw new Error(`Supabase a renvoyé ${write.status}.`);
  }));

  const failed = results.filter((result) => result.status === "rejected").length;
  return json({ updated: results.length - failed, failed }, { status: failed ? 207 : 200 });
};
