import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 12);

  await prisma.cmsAdmin.upsert({
    where: { email: "admin@jlracing.com" },
    update: {},
    create: {
      name: "CMS Admin",
      email: "admin@jlracing.com",
      passwordHash,
      isActive: true,
    },
  });

  console.log("CMS seed complete — admin@jlracing.com / admin123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
