import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("JLRacing@26", 12);
  const email = "admin@jlracing.lk";

  await prisma.cmsAdmin.upsert({
    where: { email },
    update: {},
    create: {
      name: "CMS Admin",
      email,
      passwordHash,
      isActive: true,
    },
  });

  console.log(`CMS seed complete — ${email} / JLRacing@26`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
