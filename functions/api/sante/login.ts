import { createSession, json, sessionCookie, validPassword, type Env } from "../../_lib/sante";

interface Context {
  request: Request;
  env: Env;
}

export const onRequestPost = async ({ request, env }: Context): Promise<Response> => {
  try {
    const { password } = await request.json() as { password?: unknown };
    if (!await validPassword(password, env.SANTE_PASSWORD)) {
      return json({ error: "Mot de passe incorrect." }, { status: 401 });
    }

    return json({ ok: true }, { headers: { "Set-Cookie": sessionCookie(await createSession(env.SANTE_SESSION_SECRET)) } });
  } catch {
    return json({ error: "Requête invalide." }, { status: 400 });
  }
};
