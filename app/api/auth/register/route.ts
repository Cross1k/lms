import { NextResponse } from "next/server";
import { registerUser } from "../../../server/auth/register";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  const result = await registerUser({
    email: String(body?.email ?? ""),
    password: String(body?.password ?? ""),
    name: body?.name ?? null,
    surname: body?.surname ?? null,
  });

  if (!result.ok) {
    const status =
      result.error === "EMAIL_TAKEN"
        ? 409
        : result.error === "INVALID_EMAIL" || result.error === "WEAK_PASSWORD"
          ? 400
          : 500;

    return NextResponse.json({ ok: false, error: result.error }, { status });
  }

  // Важно: passwordHash не возвращаем
  return NextResponse.json({ ok: true, user: result.user }, { status: 201 });
}
