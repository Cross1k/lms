import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export type RegisterInput = {
  email: string;
  password: string;
  name?: string | null;
  surname?: string | null;
};

export type RegisterResult =
  | {
      ok: true;
      user: { id: string; email: string; role: string; emailVerified: boolean };
    }
  | {
      ok: false;
      error: "INVALID_EMAIL" | "WEAK_PASSWORD" | "EMAIL_TAKEN" | "UNKNOWN";
    };

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function registerUser(
  input: RegisterInput,
): Promise<RegisterResult> {
  const email = normalizeEmail(input.email);
  const password = String(input.password ?? "");
  const name = input.name?.trim() || null;
  const surname = input.surname?.trim() || null;

  if (!email || !isValidEmail(email))
    return { ok: false, error: "INVALID_EMAIL" };
  if (password.length < 8) return { ok: false, error: "WEAK_PASSWORD" };

  try {
    // Можно не делать findUnique и полагаться на unique+catch P2002,
    // но это даст более понятный 409 без лишней ошибки в логах.
    const exists = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    if (exists) return { ok: false, error: "EMAIL_TAKEN" };

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        surname,
        // role не передаём -> NOBODY
        // emailVerified не передаём -> false
      },
      select: {
        id: true,
        email: true,
        role: true,
        emailVerified: true,
      },
    });

    return { ok: true, user };
  } catch (e: any) {
    // если гонка: два запроса одновременно, unique может сработать на create
    if (e?.code === "P2002") return { ok: false, error: "EMAIL_TAKEN" };
    return { ok: false, error: "UNKNOWN" };
  }
}
