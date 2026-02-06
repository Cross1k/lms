import { PrismaClient, Prisma, UserRole } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = [
  {
    email: "new.user@lms.dev",
    passwordHash: "Password123!",
    role: UserRole.NOBODY,
    emailVerified: false,
  },
  {
    email: "student@lms.dev",
    name: "Ivan",
    surname: "Petrenko",
    passwordHash: "Password123!",
    role: UserRole.STUDENT,
    emailVerified: true,
  },
  {
    email: "teacher@lms.dev",
    name: "Olena",
    surname: "Koval",
    passwordHash: "Password123!",
    role: UserRole.TEACHER,
    emailVerified: true,
  },
  {
    email: "supervisor@lms.dev",
    name: "Andrii",
    surname: "Shevchenko",
    passwordHash: "Password123!",
    role: UserRole.SUPERVISOR,
    emailVerified: true,
  },
];

export async function main() {
  for (const u of userData) {
    const passwordHash = await bcrypt.hash(u.passwordHash, 12);
    await prisma.user.create({ data: { ...u, passwordHash } });
  }
}

main();
