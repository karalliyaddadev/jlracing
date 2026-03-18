import { prisma } from "../../database/prisma.client";
import { AppError } from "../../common/utils/errors";
import type { CreateBrandDto, UpdateBrandDto, CreateModelDto, UpdateModelDto, CreateColorDto, UpdateColorDto } from "./dto/brand.dto";
import type {
  CreateVehicleDto,
  BulkCreateVehicleDto,
  UpdateVehicleDto,
  VehicleQueryDto,
  RenameFileNoDto,
  DeleteFileNoDto,
} from "./dto/vehicle.dto";

// ── Utility: generate unique display ID ───────────────────────────────────────
async function generateDisplayId(): Promise<string> {
  const count = await prisma.bikeVehicle.count();
  return `JLR-${String(count + 1).padStart(5, "0")}`;
}

// ── Brands ────────────────────────────────────────────────────────────────────

export async function listBrands() {
  return prisma.bikeBrand.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { models: true, vehicles: true } } },
  });
}

export async function getBrand(id: number) {
  const brand = await prisma.bikeBrand.findUnique({
    where: { id },
    include: { models: { orderBy: { name: "asc" } } },
  });
  if (!brand) throw AppError.notFound(`Brand with id ${id} not found`);
  return brand;
}

export async function createBrand(dto: CreateBrandDto) {
  const existing = await prisma.bikeBrand.findUnique({ where: { name: dto.name } });
  if (existing) throw AppError.conflict(`Brand "${dto.name}" already exists`);
  return prisma.bikeBrand.create({ data: { name: dto.name } });
}

export async function updateBrand(id: number, dto: UpdateBrandDto) {
  await getBrand(id);
  if (dto.name) {
    const conflict = await prisma.bikeBrand.findFirst({ where: { name: dto.name, id: { not: id } } });
    if (conflict) throw AppError.conflict(`Brand "${dto.name}" already exists`);
  }
  return prisma.bikeBrand.update({ where: { id }, data: dto });
}

export async function deleteBrand(id: number) {
  await getBrand(id);
  await prisma.bikeBrand.delete({ where: { id } }); // cascades to models + vehicles
}

// ── Models ────────────────────────────────────────────────────────────────────

export async function listModels(brandId: number) {
  await getBrand(brandId);
  return prisma.bikeModel.findMany({
    where: { brandId },
    orderBy: { name: "asc" },
    include: { _count: { select: { vehicles: true } } },
  });
}

export async function listAllModels() {
  return prisma.bikeModel.findMany({
    orderBy: { name: "asc" },
    include: { brand: { select: { id: true, name: true } }, _count: { select: { vehicles: true } } },
  });
}

export async function getModel(id: number) {
  const model = await prisma.bikeModel.findUnique({ where: { id } });
  if (!model) throw AppError.notFound(`Model with id ${id} not found`);
  return model;
}

export async function createModel(brandId: number, dto: CreateModelDto) {
  await getBrand(brandId);
  const existing = await prisma.bikeModel.findUnique({
    where: { name_brandId: { name: dto.name, brandId } },
  });
  if (existing) throw AppError.conflict(`Model "${dto.name}" already exists for this brand`);
  return prisma.bikeModel.create({ data: { name: dto.name, brandId } });
}

export async function updateModel(id: number, dto: UpdateModelDto) {
  const model = await getModel(id);
  if (dto.name) {
    const conflict = await prisma.bikeModel.findFirst({
      where: { name: dto.name, brandId: model.brandId, id: { not: id } },
    });
    if (conflict) throw AppError.conflict(`Model "${dto.name}" already exists for this brand`);
  }
  return prisma.bikeModel.update({ where: { id }, data: dto });
}

export async function deleteModel(id: number) {
  await getModel(id);
  await prisma.bikeModel.delete({ where: { id } }); // cascades to vehicles
}

// ── Colors ────────────────────────────────────────────────────────────────────

export async function listColors() {
  return prisma.bikeColor.findMany({ orderBy: { name: "asc" } });
}

export async function createColor(dto: CreateColorDto) {
  const existing = await prisma.bikeColor.findUnique({ where: { name: dto.name } });
  if (existing) throw AppError.conflict(`Color "${dto.name}" already exists`);
  return prisma.bikeColor.create({ data: { name: dto.name } });
}

export async function updateColor(id: number, dto: UpdateColorDto) {
  const color = await prisma.bikeColor.findUnique({ where: { id } });
  if (!color) throw AppError.notFound("Color not found");
  if (dto.name) {
    const conflict = await prisma.bikeColor.findFirst({ where: { name: dto.name, id: { not: id } } });
    if (conflict) throw AppError.conflict(`Color "${dto.name}" already exists`);
  }
  return prisma.bikeColor.update({ where: { id }, data: dto });
}

export async function deleteColor(id: number) {
  const color = await prisma.bikeColor.findUnique({ where: { id } });
  if (!color) throw AppError.notFound("Color not found");
  await prisma.bikeColor.delete({ where: { id } });
}

// ── Vehicles ──────────────────────────────────────────────────────────────────

const vehicleInclude = {
  brand: { select: { id: true, name: true } },
  model: { select: { id: true, name: true } },
} as const;

/** Grouped summary: one row per brand+model combination with stock count */
export async function vehicleSummary(status?: string) {
  const where = status ? { status } : undefined;
  const vehicles = await prisma.bikeVehicle.findMany({
    where,
    include: vehicleInclude,
    orderBy: [{ brandId: "asc" }, { modelId: "asc" }, { createdAt: "desc" }],
  });

  // Group by brandId + modelId
  type GroupKey = string;
  const groups = new Map<GroupKey, typeof vehicles>();
  for (const v of vehicles) {
    const key: GroupKey = `${v.brandId}_${v.modelId}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(v);
  }

  return Array.from(groups.entries()).map(([, items]) => ({
    brandId:   items[0].brandId,
    brandName: items[0].brand.name,
    modelId:   items[0].modelId,
    modelName: items[0].model.name,
    count:     items.length,
    vehicles:  items,
  }));
}

export async function listVehicles(query: VehicleQueryDto) {
  const { page, limit, brandId, modelId, colour, year, fileNo, registerNo, status, search } = query;
  const skip = (page - 1) * limit;

  const where = {
    ...(brandId ? { brandId } : {}),
    ...(modelId ? { modelId } : {}),
    ...(colour ? { colour: { contains: colour, mode: "insensitive" as const } } : {}),
    ...(year ? { year } : {}),
    ...(fileNo ? { fileNo: { contains: fileNo, mode: "insensitive" as const } } : {}),
    ...(registerNo ? { registerNo: { contains: registerNo, mode: "insensitive" as const } } : {}),
    ...(status  ? { status }  : {}),
    ...(search ? {
      OR: [
        { chassisNo:  { contains: search, mode: "insensitive" as const } },
        { engineNo:   { contains: search, mode: "insensitive" as const } },
        { registerNo: { contains: search, mode: "insensitive" as const } },
        { displayId:  { contains: search, mode: "insensitive" as const } },
        { colour:     { contains: search, mode: "insensitive" as const } },
        { fileNo:     { contains: search, mode: "insensitive" as const } },
      ],
    } : {}),
  };

  const [vehicles, total] = await Promise.all([
    prisma.bikeVehicle.findMany({ where, skip, take: limit, orderBy: { createdAt: "desc" }, include: vehicleInclude }),
    prisma.bikeVehicle.count({ where }),
  ]);

  return { vehicles, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
}

export async function getVehicle(id: number) {
  const vehicle = await prisma.bikeVehicle.findUnique({ where: { id }, include: vehicleInclude });
  if (!vehicle) throw AppError.notFound(`Vehicle with id ${id} not found`);
  return vehicle;
}

export async function createVehicle(dto: CreateVehicleDto) {
  const model = await prisma.bikeModel.findUnique({ where: { id: dto.modelId } });
  if (!model) throw AppError.notFound("Model not found");
  if (model.brandId !== dto.brandId) throw AppError.validation("Model does not belong to the selected brand");

  const displayId = await generateDisplayId();
  return prisma.bikeVehicle.create({
    data: { ...dto, displayId, status: dto.status ?? "available" },
    include: vehicleInclude,
  });
}

export async function bulkCreateVehicles(dto: BulkCreateVehicleDto) {
  const model = await prisma.bikeModel.findUnique({ where: { id: dto.modelId } });
  if (!model) throw AppError.notFound("Model not found");
  if (model.brandId !== dto.brandId) throw AppError.validation("Model does not belong to the selected brand");

  const created = [];
  for (let i = 0; i < dto.count; i++) {
    const displayId = await generateDisplayId();
    const v = await prisma.bikeVehicle.create({
      data: {
        displayId,
        brandId: dto.brandId,
        modelId: dto.modelId,
        colour: dto.colour,
        year: dto.year,
        status: "available",
      },
      include: vehicleInclude,
    });
    created.push(v);
  }
  return created;
}

export async function updateVehicle(id: number, dto: UpdateVehicleDto) {
  const existing = await getVehicle(id);
  const brandId = dto.brandId ?? existing.brandId;
  const modelId = dto.modelId ?? existing.modelId;

  if (dto.modelId || dto.brandId) {
    const model = await prisma.bikeModel.findUnique({ where: { id: modelId } });
    if (!model) throw AppError.notFound("Model not found");
    if (model.brandId !== brandId) throw AppError.validation("Model does not belong to the selected brand");
  }

  const data: Record<string, unknown> = { ...dto };
  if (dto.status === "sold" && existing.status !== "sold") data.soldAt = new Date();
  if (dto.status === "available") data.soldAt = null;

  return prisma.bikeVehicle.update({ where: { id }, data, include: vehicleInclude });
}

export async function deleteVehicle(id: number) {
  await getVehicle(id);
  await prisma.bikeVehicle.delete({ where: { id } });
}

/** Distinct file numbers already in use — for autocomplete */
export async function listFileNos() {
  const rows = await prisma.bikeVehicle.findMany({
    where: { fileNo: { not: null } },
    select: { fileNo: true },
    distinct: ["fileNo"],
    orderBy: { fileNo: "asc" },
  });
  return rows.map((r) => r.fileNo).filter(Boolean) as string[];
}

export async function renameFileNo(dto: RenameFileNoDto) {
  if (dto.oldFileNo === dto.newFileNo) return { updated: 0 };

  const sourceCount = await prisma.bikeVehicle.count({ where: { fileNo: dto.oldFileNo } });
  if (sourceCount === 0) throw AppError.notFound(`File number \"${dto.oldFileNo}\" not found`);

  const targetCount = await prisma.bikeVehicle.count({ where: { fileNo: dto.newFileNo } });
  if (targetCount > 0) throw AppError.conflict(`File number \"${dto.newFileNo}\" already exists`);

  const result = await prisma.bikeVehicle.updateMany({
    where: { fileNo: dto.oldFileNo },
    data: { fileNo: dto.newFileNo },
  });

  return { updated: result.count };
}

export async function deleteFileNo(dto: DeleteFileNoDto) {
  const sourceCount = await prisma.bikeVehicle.count({ where: { fileNo: dto.fileNo } });
  if (sourceCount === 0) throw AppError.notFound(`File number \"${dto.fileNo}\" not found`);

  const result = await prisma.bikeVehicle.updateMany({
    where: { fileNo: dto.fileNo },
    data: { fileNo: null },
  });

  return { updated: result.count };
}
