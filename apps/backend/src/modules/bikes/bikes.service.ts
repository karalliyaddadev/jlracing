import { prisma } from "../../database/prisma.client";
import { AppError } from "../../common/utils/errors";
import type { CreateBikeDto, UpdateBikeDto, BikeQueryDto } from "./dto/bike.dto";

export async function listBikes(query: BikeQueryDto) {
  const { page, limit, brand, inStock } = query;
  const skip = (page - 1) * limit;

  const where = {
    ...(brand ? { brand: { contains: brand, mode: "insensitive" as const } } : {}),
    ...(inStock !== undefined ? { inStock: inStock === "true" } : {}),
  };

  const [bikes, total] = await Promise.all([
    prisma.bike.findMany({ where, skip, take: limit, orderBy: { createdAt: "desc" } }),
    prisma.bike.count({ where }),
  ]);

  return {
    bikes,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  };
}

export async function getBike(id: number) {
  const bike = await prisma.bike.findUnique({ where: { id } });
  if (!bike) throw AppError.notFound(`Bike with id ${id} not found`);
  return bike;
}

export async function createBike(dto: CreateBikeDto) {
  return prisma.bike.create({ data: dto });
}

export async function updateBike(id: number, dto: UpdateBikeDto) {
  await getBike(id); // ensure exists
  return prisma.bike.update({ where: { id }, data: dto });
}

export async function deleteBike(id: number) {
  await getBike(id); // ensure exists
  await prisma.bike.delete({ where: { id } });
}
