import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Bike Project data...");

  const passwordHash = await bcrypt.hash("Admin@123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@bikeproject.com" },
    update: {
      name: "System Admin",
      role: Role.ADMIN,
      passwordHash,
    },
    create: {
      name: "System Admin",
      email: "admin@bikeproject.com",
      passwordHash,
      role: Role.ADMIN,
    },
  });

  const bikes = [
    { name: "Commuter 100", brand: "ArmiGo Bikes", model: "C100", year: 2024, price: 1200.0, inStock: true },
    { name: "Trail Master", brand: "ArmiGo Bikes", model: "TMX", year: 2025, price: 1899.99, inStock: true },
    { name: "City Lite", brand: "UrbanRide", model: "CL-2", year: 2023, price: 899.5, inStock: false },
  ];

  await prisma.bike.deleteMany();
  await prisma.bike.createMany({ data: bikes });

  const bikeCount = await prisma.bike.count();
  console.log(`Seed complete. Admin: ${admin.email}, Bikes: ${bikeCount}`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });