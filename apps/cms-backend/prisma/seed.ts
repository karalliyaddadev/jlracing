import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("JLRacing@26", 12);

  await prisma.cmsAdmin.upsert({
    where: { email: "jlracing16@gmail.com" },
    update: {},
    create: {
      name: "CMS Admin",
      email: "jlracing16@gmail.com",
      passwordHash,
      isActive: true,
    },
  });

  console.log("CMS seed complete — jlracing16@gmail.com / JLRacing@26");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
