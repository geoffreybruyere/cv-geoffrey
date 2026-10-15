import { hasValidSession, json, supabaseFetch, type Env } from "../../_lib/sante";

interface Context {
  request: Request;
  env: Env;
}

export const onRequestGet = async ({ request, env }: Context): Promise<Response> => {
  if (!await hasValidSession(request, env.SANTE_SESSION_SECRET)) return json({ error: "Non autorisé." }, { status: 401 });

  const [measurementsResponse, analysesResponse] = await Promise.all([
    supabaseFetch(env, "health_measurements?select=analyte,value_numeric,unit,reference_low,reference_high,reference_operator,reference_text,abnormality,notes,exam:health_exams!inner(exam_date,laboratory,exam_name,notes)&value_numeric=not.is.null&order=created_at.asc"),
    supabaseFetch(env, "health_marker_analyses?select=analyte,unit,analysis,generated_at,source_exam_date"),
  ]);

  if (!measurementsResponse.ok) return json({ error: "Les données de santé sont indisponibles." }, { status: 502 });
  const measurements = await measurementsResponse.json();
  const analyses = analysesResponse.ok ? await analysesResponse.json() : [];
  return json({ measurements, analyses, updatedAt: new Date().toISOString() });
};
