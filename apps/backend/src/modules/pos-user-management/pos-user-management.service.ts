import { Prisma } from "@prisma/client";
import { prisma } from "../../database/prisma.client";
import { AppError } from "../../common/utils/errors";
import type {
  CreatePurchaseDto,
  CreatePosUserDto,
  PurchaseQueryDto,
  PosUserQueryDto,
  UpdatePosUserDto,
} from "./dto/pos-user.dto";

const PROVINCE_DISTRICT_MAP = {
  "Western": ["Colombo", "Gampaha", "Kalutara"],
  "Central": ["Kandy", "Matale", "Nuwara Eliya"],
  "Southern": ["Galle", "Matara", "Hambantota"],
  "Northern": ["Jaffna", "Kilinochchi", "Mannar", "Mullaitivu", "Vavuniya"],
  "Eastern": ["Trincomalee", "Batticaloa", "Ampara"],
  "North Western": ["Kurunegala", "Puttalam"],
  "North Central": ["Anuradhapura", "Polonnaruwa"],
  "Uva": ["Badulla", "Monaragala"],
  "Sabaragamuwa": ["Ratnapura", "Kegalle"],
} as const;

const customerInclude = {
  dreamBikes: {
    include: {
      bikeVehicle: {
        select: {
          id: true,
          displayId: true,
          status: true,
          colour: true,
          year: true,
          sellingPrice: true,
          brand: { select: { name: true } },
          model: { select: { name: true } },
        },
      },
    },
    orderBy: { id: "desc" as const },
  },
} as const;

function normalizeSearch(search?: string) {
  const value = search?.trim();
  return value && value.length > 0 ? value : undefined;
}

function getPurchaseModelClient(db: any) {
  const model = db?.posCustomerPurchase;
  if (!model) {
    throw new AppError(
      "Purchase model is unavailable. Run 'npm run db:generate' in apps/backend and restart the backend server.",
      500
    );
  }
  return model;
}

function mapUniqueConstraint(error: Prisma.PrismaClientKnownRequestError) {
  const target = `${error.meta?.target ?? ""}`;
  if (target.includes("nic")) return AppError.conflict("NIC already exists");
  if (target.includes("mobileNumber")) return AppError.conflict("Mobile number already exists");
  if (target.includes("email")) return AppError.conflict("Email already exists");
  return AppError.conflict("Record already exists");
}

function ensureDistrictInProvince(province: string, district: string) {
  const validDistricts = PROVINCE_DISTRICT_MAP[province as keyof typeof PROVINCE_DISTRICT_MAP];
  if (!validDistricts) {
    throw AppError.validation({ province: ["Invalid province"] });
  }
  if (!validDistricts.includes(district as never)) {
    throw AppError.validation({ district: ["District does not match selected province"] });
  }
}

async function ensureDreamBikesExist(dreamBikeIds: number[]) {
  if (dreamBikeIds.length === 0) return;
  const found = await prisma.bikeVehicle.findMany({
    where: { id: { in: dreamBikeIds } },
    select: { id: true },
  });
  if (found.length !== dreamBikeIds.length) {
    throw AppError.validation({ dreamBikeIds: ["One or more selected dream bikes are invalid"] });
  }
}

function mapCustomer(customer: {
  id: number;
  firstName: string;
  lastName: string;
  nic: string;
  mobileNumber: string;
  email: string | null;
  province: string;
  district: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  dreamBikes: Array<{
    id: number;
    bikeVehicleId: number;
    bikeVehicle: {
      id: number;
      displayId: string;
      status: string;
      colour: string;
      year: number | null;
      sellingPrice: number | null;
      brand: { name: string };
      model: { name: string };
    };
  }>;
}) {
  return {
    id: customer.id,
    firstName: customer.firstName,
    lastName: customer.lastName,
    nic: customer.nic,
    mobileNumber: customer.mobileNumber,
    email: customer.email,
    province: customer.province,
    district: customer.district,
    address: customer.address,
    createdAt: customer.createdAt,
    updatedAt: customer.updatedAt,
    dreamBikes: customer.dreamBikes.map((entry) => ({
      relationId: entry.id,
      bikeId: entry.bikeVehicleId,
      displayId: entry.bikeVehicle.displayId,
      brandName: entry.bikeVehicle.brand.name,
      modelName: entry.bikeVehicle.model.name,
      colour: entry.bikeVehicle.colour,
      year: entry.bikeVehicle.year,
      sellingPrice: entry.bikeVehicle.sellingPrice,
      availability: entry.bikeVehicle.status,
    })),
  };
}

export function getProvinceDistrictMeta() {
  return {
    provinces: Object.entries(PROVINCE_DISTRICT_MAP).map(([name, districts]) => ({
      name,
      districts,
    })),
  };
}

export async function listDreamBikeOptions() {
  const bikes = await prisma.bikeVehicle.findMany({
    orderBy: [{ createdAt: "desc" }],
    take: 5000,
    select: {
      id: true,
      displayId: true,
      status: true,
      colour: true,
      year: true,
      sellingPrice: true,
      brand: { select: { name: true } },
      model: { select: { name: true } },
    },
  });

  return bikes.map((bike) => ({
    id: bike.id,
    displayId: bike.displayId,
    brandName: bike.brand.name,
    modelName: bike.model.name,
    colour: bike.colour,
    year: bike.year,
    sellingPrice: bike.sellingPrice,
    availability: bike.status,
  }));
}

export async function listPosUsers(query: PosUserQueryDto) {
  const { page, limit } = query;
  const skip = (page - 1) * limit;
  const search = normalizeSearch(query.search);

  const where: Prisma.PosCustomerWhereInput = search
    ? {
        OR: [
          { firstName: { contains: search, mode: "insensitive" } },
          { lastName: { contains: search, mode: "insensitive" } },
          { nic: { contains: search, mode: "insensitive" } },
          { mobileNumber: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { province: { contains: search, mode: "insensitive" } },
          { district: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  const [users, total] = await Promise.all([
    prisma.posCustomer.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: customerInclude,
    }),
    prisma.posCustomer.count({ where }),
  ]);

  return {
    users: users.map(mapCustomer),
    total,
    page,
    limit,
  };
}

export async function getPosUser(id: number) {
  const user = await prisma.posCustomer.findUnique({
    where: { id },
    include: customerInclude,
  });
  if (!user) throw AppError.notFound("User not found");
  return mapCustomer(user);
}

export async function createPosUser(dto: CreatePosUserDto) {
  const dreamBikeIds = dto.dreamBikeIds ?? [];
  ensureDistrictInProvince(dto.province, dto.district);
  await ensureDreamBikesExist(dreamBikeIds);

  try {
    const created = await prisma.posCustomer.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        nic: dto.nic,
        mobileNumber: dto.mobileNumber,
        email: dto.email,
        province: dto.province,
        district: dto.district,
        address: dto.address,
        dreamBikes: {
          create: dreamBikeIds.map((bikeId) => ({ bikeVehicleId: bikeId })),
        },
      },
      include: customerInclude,
    });

    return mapCustomer(created);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw mapUniqueConstraint(error);
    }
    throw error;
  }
}

export async function updatePosUser(id: number, dto: UpdatePosUserDto) {
  const existing = await prisma.posCustomer.findUnique({ where: { id }, select: { id: true } });
  if (!existing) throw AppError.notFound("User not found");

  const updateData: Prisma.PosCustomerUpdateInput = {};

  if (dto.firstName !== undefined) updateData.firstName = dto.firstName;
  if (dto.lastName !== undefined) updateData.lastName = dto.lastName;
  if (dto.nic !== undefined) updateData.nic = dto.nic;
  if (dto.mobileNumber !== undefined) updateData.mobileNumber = dto.mobileNumber;
  if (dto.email !== undefined) updateData.email = dto.email ?? null;
  if (dto.province !== undefined) updateData.province = dto.province;
  if (dto.district !== undefined) updateData.district = dto.district;
  if (dto.address !== undefined) updateData.address = dto.address;

  const effectiveProvince = dto.province;
  const effectiveDistrict = dto.district;
  if (effectiveProvince && effectiveDistrict) {
    ensureDistrictInProvince(effectiveProvince, effectiveDistrict);
  } else if (effectiveProvince || effectiveDistrict) {
    const current = await prisma.posCustomer.findUnique({
      where: { id },
      select: { province: true, district: true },
    });
    if (!current) throw AppError.notFound("User not found");
    ensureDistrictInProvince(effectiveProvince ?? current.province, effectiveDistrict ?? current.district);
  }

  if (dto.dreamBikeIds !== undefined) {
    const dreamBikeIds = dto.dreamBikeIds ?? [];
    await ensureDreamBikesExist(dreamBikeIds);
    updateData.dreamBikes = {
      deleteMany: {},
      create: dreamBikeIds.map((bikeId) => ({ bikeVehicleId: bikeId })),
    };
  }

  try {
    const updated = await prisma.posCustomer.update({
      where: { id },
      data: updateData,
      include: customerInclude,
    });
    return mapCustomer(updated);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw mapUniqueConstraint(error);
    }
    throw error;
  }
}

export async function deletePosUser(id: number) {
  const existing = await prisma.posCustomer.findUnique({ where: { id }, select: { id: true } });
  if (!existing) throw AppError.notFound("User not found");
  await prisma.posCustomer.delete({ where: { id } });
}

export async function createPurchase(customerId: number, dto: CreatePurchaseDto) {
  const customer = await prisma.posCustomer.findUnique({
    where: { id: customerId },
    select: { id: true, firstName: true, lastName: true, nic: true, mobileNumber: true, address: true },
  });
  if (!customer) throw AppError.notFound("User not found");

  if (dto.purchaseType === "BIKE") {
    const bikeId = dto.bikeVehicleId;
    if (!bikeId) throw AppError.validation({ bikeVehicleId: ["Bike is required"] });

    const bike = await prisma.bikeVehicle.findUnique({
      where: { id: bikeId },
      select: {
        id: true,
        status: true,
        sellingPrice: true,
        displayId: true,
        colour: true,
        year: true,
        engineCapacityCc: true,
        mileage: true,
        condition: true,
        registrationType: true,
        fileNo: true,
        registerNo: true,
        chassisNo: true,
        engineNo: true,
        description: true,
        brand: { select: { name: true } },
        model: { select: { name: true } },
      },
    });

    if (!bike) throw AppError.notFound("Selected bike not found");
    if (bike.status !== "available") throw AppError.validation({ bikeVehicleId: ["Selected bike is not available"] });

    const result = await prisma.$transaction(async (tx) => {
      const purchase = await getPurchaseModelClient(tx as any).create({
        data: {
          customerId,
          itemType: "BIKE",
          bikeVehicleId: bikeId,
          quantity: 1,
          currentSellingPrice: bike.sellingPrice,
          finalSellingPrice: dto.finalSellingPrice,
        },
      });

      await tx.bikeVehicle.update({
        where: { id: bikeId },
        data: {
          status: "sold",
          soldAt: new Date(),
          sellingPrice: dto.finalSellingPrice,
        },
      });

      return purchase;
    });

    return {
      id: result.id,
      itemType: "BIKE",
      customerId,
      quantity: 1,
      bikeVehicleId: bikeId,
      customer: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        nic: customer.nic,
        mobileNumber: customer.mobileNumber,
        address: customer.address,
      },
      bikeDisplayId: bike.displayId,
      bikeName: `${bike.brand.name} ${bike.model.name}`,
      bikeDetails: {
        brand: bike.brand.name,
        model: bike.model.name,
        colour: bike.colour,
        year: bike.year,
        engineCapacityCc: bike.engineCapacityCc,
        mileage: bike.mileage,
        condition: bike.condition,
        registrationType: bike.registrationType,
        fileNo: bike.fileNo,
        registerNo: bike.registerNo,
        chassisNo: bike.chassisNo,
        engineNo: bike.engineNo,
        description: bike.description,
      },
      currentSellingPrice: bike.sellingPrice,
      finalSellingPrice: dto.finalSellingPrice,
      purchasedAt: result.purchasedAt,
    };
  }

  const productId = dto.inventoryProductId;
  if (!productId) throw AppError.validation({ inventoryProductId: ["Inventory product is required"] });

  const product = await prisma.inventoryProduct.findUnique({
    where: { id: productId },
    include: {
      brand: { select: { name: true } },
      category: { select: { name: true } },
      supplier: { select: { name: true, code: true } },
    },
  });

  if (!product) throw AppError.notFound("Selected inventory product not found");
  if ((dto.quantity ?? 1) > product.quantity) {
    throw AppError.validation({ quantity: [`Only ${product.quantity} item(s) available`] });
  }

  const result = await prisma.$transaction(async (tx) => {
    const purchase = await getPurchaseModelClient(tx as any).create({
      data: {
        customerId,
        itemType: "INVENTORY",
        inventoryProductId: productId,
        quantity: dto.quantity ?? 1,
        currentSellingPrice: product.sellingPrice,
        finalSellingPrice: dto.finalSellingPrice,
      },
    });

    await tx.inventoryProduct.update({
      where: { id: productId },
      data: {
        quantity: { decrement: dto.quantity ?? 1 },
        soldQuantity: { increment: dto.quantity ?? 1 },
        lastSoldAt: new Date(),
        sellingPrice: dto.finalSellingPrice,
      },
    });

    return purchase;
  });

  return {
    id: result.id,
    itemType: "INVENTORY",
    customerId,
    quantity: dto.quantity ?? 1,
    inventoryProductId: productId,
    customer: {
      firstName: customer.firstName,
      lastName: customer.lastName,
      nic: customer.nic,
      mobileNumber: customer.mobileNumber,
      address: customer.address,
    },
    productDisplayId: product.displayId,
    productName: product.name,
    productDetails: {
      brand: product.brand.name,
      category: product.category.name,
      supplier: product.supplier ? `${product.supplier.name} (${product.supplier.code})` : null,
      inStockBeforePurchase: product.quantity,
      description: product.description,
    },
    currentSellingPrice: product.sellingPrice,
    finalSellingPrice: dto.finalSellingPrice,
    purchasedAt: result.purchasedAt,
  };
}

export async function listPurchases(query: PurchaseQueryDto) {
  const { page, limit } = query;
  const skip = (page - 1) * limit;
  const search = normalizeSearch(query.search);

  const where: any = search
    ? {
        OR: [
          { customer: { firstName: { contains: search, mode: "insensitive" } } },
          { customer: { lastName: { contains: search, mode: "insensitive" } } },
          { customer: { nic: { contains: search, mode: "insensitive" } } },
          { bikeVehicle: { displayId: { contains: search, mode: "insensitive" } } },
          { bikeVehicle: { brand: { name: { contains: search, mode: "insensitive" } } } },
          { bikeVehicle: { model: { name: { contains: search, mode: "insensitive" } } } },
        ],
      }
    : {};

  const [rows, total] = await Promise.all([
    getPurchaseModelClient(prisma as any).findMany({
      where,
      skip,
      take: limit,
      orderBy: { purchasedAt: "desc" },
      include: {
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            nic: true,
            mobileNumber: true,
            address: true,
            province: true,
            district: true,
          },
        },
        bikeVehicle: {
          select: {
            id: true,
            displayId: true,
            colour: true,
            year: true,
            engineCapacityCc: true,
            mileage: true,
            condition: true,
            registrationType: true,
            fileNo: true,
            registerNo: true,
            chassisNo: true,
            engineNo: true,
            description: true,
            brand: { select: { name: true } },
            model: { select: { name: true } },
          },
        },
        inventoryProduct: {
          select: {
            id: true,
            displayId: true,
            name: true,
            quantity: true,
            soldQuantity: true,
            description: true,
            brand: { select: { name: true } },
            category: { select: { name: true } },
            supplier: { select: { name: true, code: true } },
          },
        },
      },
    }),
    getPurchaseModelClient(prisma as any).count({ where }),
  ]);

  return {
    purchases: rows.map((row: any) => ({
      id: row.id,
      purchasedAt: row.purchasedAt,
      itemType: row.itemType,
      quantity: row.quantity,
      currentSellingPrice: row.currentSellingPrice,
      finalSellingPrice: row.finalSellingPrice,
      customer: row.customer,
      bike: row.bikeVehicle ? {
        id: row.bikeVehicle.id,
        displayId: row.bikeVehicle.displayId,
        brand: row.bikeVehicle.brand.name,
        model: row.bikeVehicle.model.name,
        colour: row.bikeVehicle.colour,
        year: row.bikeVehicle.year,
        engineCapacityCc: row.bikeVehicle.engineCapacityCc,
        mileage: row.bikeVehicle.mileage,
        condition: row.bikeVehicle.condition,
        registrationType: row.bikeVehicle.registrationType,
        fileNo: row.bikeVehicle.fileNo,
        registerNo: row.bikeVehicle.registerNo,
        chassisNo: row.bikeVehicle.chassisNo,
        engineNo: row.bikeVehicle.engineNo,
        description: row.bikeVehicle.description,
      } : null,
      inventory: row.inventoryProduct ? {
        id: row.inventoryProduct.id,
        displayId: row.inventoryProduct.displayId,
        name: row.inventoryProduct.name,
        brand: row.inventoryProduct.brand.name,
        category: row.inventoryProduct.category.name,
        supplier: row.inventoryProduct.supplier ? `${row.inventoryProduct.supplier.name} (${row.inventoryProduct.supplier.code})` : null,
        description: row.inventoryProduct.description,
      } : null,
    })),
    total,
    page,
    limit,
  };
}

export async function listPurchasesByUser(customerId: number, query: PurchaseQueryDto) {
  const customer = await prisma.posCustomer.findUnique({ where: { id: customerId }, select: { id: true } });
  if (!customer) throw AppError.notFound("User not found");

  const { page, limit } = query;
  const skip = (page - 1) * limit;
  const search = normalizeSearch(query.search);

  const where: any = {
    customerId,
    ...(search
      ? {
          OR: [
            { bikeVehicle: { displayId: { contains: search, mode: "insensitive" } } },
            { bikeVehicle: { brand: { name: { contains: search, mode: "insensitive" } } } },
            { bikeVehicle: { model: { name: { contains: search, mode: "insensitive" } } } },
            { inventoryProduct: { displayId: { contains: search, mode: "insensitive" } } },
            { inventoryProduct: { name: { contains: search, mode: "insensitive" } } },
            { inventoryProduct: { brand: { name: { contains: search, mode: "insensitive" } } } },
            { inventoryProduct: { category: { name: { contains: search, mode: "insensitive" } } } },
          ],
        }
      : {}),
  };

  const [rows, total] = await Promise.all([
    getPurchaseModelClient(prisma as any).findMany({
      where,
      skip,
      take: limit,
      orderBy: { purchasedAt: "desc" },
      include: {
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            nic: true,
            mobileNumber: true,
            address: true,
            province: true,
            district: true,
          },
        },
        bikeVehicle: {
          select: {
            id: true,
            displayId: true,
            colour: true,
            year: true,
            engineCapacityCc: true,
            mileage: true,
            condition: true,
            registrationType: true,
            fileNo: true,
            registerNo: true,
            chassisNo: true,
            engineNo: true,
            description: true,
            brand: { select: { name: true } },
            model: { select: { name: true } },
          },
        },
        inventoryProduct: {
          select: {
            id: true,
            displayId: true,
            name: true,
            quantity: true,
            soldQuantity: true,
            description: true,
            brand: { select: { name: true } },
            category: { select: { name: true } },
            supplier: { select: { name: true, code: true } },
          },
        },
      },
    }),
    getPurchaseModelClient(prisma as any).count({ where }),
  ]);

  return {
    purchases: rows.map((row: any) => ({
      id: row.id,
      purchasedAt: row.purchasedAt,
      itemType: row.itemType,
      quantity: row.quantity,
      currentSellingPrice: row.currentSellingPrice,
      finalSellingPrice: row.finalSellingPrice,
      customer: row.customer,
      bike: row.bikeVehicle
        ? {
            id: row.bikeVehicle.id,
            displayId: row.bikeVehicle.displayId,
            brand: row.bikeVehicle.brand.name,
            model: row.bikeVehicle.model.name,
            colour: row.bikeVehicle.colour,
            year: row.bikeVehicle.year,
            engineCapacityCc: row.bikeVehicle.engineCapacityCc,
            mileage: row.bikeVehicle.mileage,
            condition: row.bikeVehicle.condition,
            registrationType: row.bikeVehicle.registrationType,
            fileNo: row.bikeVehicle.fileNo,
            registerNo: row.bikeVehicle.registerNo,
            chassisNo: row.bikeVehicle.chassisNo,
            engineNo: row.bikeVehicle.engineNo,
            description: row.bikeVehicle.description,
          }
        : null,
      inventory: row.inventoryProduct
        ? {
            id: row.inventoryProduct.id,
            displayId: row.inventoryProduct.displayId,
            name: row.inventoryProduct.name,
            brand: row.inventoryProduct.brand.name,
            category: row.inventoryProduct.category.name,
            supplier: row.inventoryProduct.supplier
              ? `${row.inventoryProduct.supplier.name} (${row.inventoryProduct.supplier.code})`
              : null,
            description: row.inventoryProduct.description,
          }
        : null,
    })),
    total,
    page,
    limit,
  };
}