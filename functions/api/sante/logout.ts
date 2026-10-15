import { clearSessionCookie, json } from "../../_lib/sante";

export const onRequestPost = async (): Promise<Response> => json({ ok: true }, { headers: { "Set-Cookie": clearSessionCookie() } });
