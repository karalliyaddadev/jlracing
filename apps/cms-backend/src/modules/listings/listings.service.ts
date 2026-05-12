import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../common/database/prisma.service";
import { CreateForeignListingDto } from "./dto/create-foreign-listing.dto";
import { UpdateForeignListingDto } from "./dto/update-foreign-listing.dto";

const IMAGE_INCLUDE = {
  images: {
    orderBy: [{ isPrimary: "desc" as const }, { sortOrder: "asc" as const }],
  },
};

@Injectable()
export class ListingsService {
  constructor(private prisma: PrismaService) {}

  findAll(category?: string) {
    return this.prisma.foreignListing.findMany({
      where: category ? { category } : undefined,
      orderBy: { createdAt: "desc" },
      include: IMAGE_INCLUDE,
    });
  }

  findActive(category?: string, page = 1, limit = 6) {
    const skip = (page - 1) * limit;
    return this.prisma.foreignListing.findMany({
      where: { isActive: true, ...(category ? { category } : {}) },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      include: IMAGE_INCLUDE,
    });
  }

  async countActive(category?: string) {
    return this.prisma.foreignListing.count({
      where: { isActive: true, ...(category ? { category } : {}) },
    });
  }

  async findOne(id: number) {
    const item = await this.prisma.foreignListing.findUnique({
      where: { id },
      include: IMAGE_INCLUDE,
    });
    if (!item) throw new NotFoundException(`Listing #${id} not found`);
    return item;
  }

  create(dto: CreateForeignListingDto) {
    return this.prisma.foreignListing.create({ data: dto, include: IMAGE_INCLUDE });
  }

  async update(id: number, dto: UpdateForeignListingDto) {
    await this.findOne(id);
    return this.prisma.foreignListing.update({
      where: { id },
      data: dto,
      include: IMAGE_INCLUDE,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.foreignListing.delete({ where: { id } });
  }

  // ── Image management ──────────────────────────────────────────────────────

  async addImage(
    listingId: number,
    url: string,
    isPrimary = false,
    sortOrder = 0,
  ) {
    await this.findOne(listingId);
    if (isPrimary) {
      await this.prisma.foreignListingImage.updateMany({
        where: { listingId },
        data: { isPrimary: false },
      });
    }
    return this.prisma.foreignListingImage.create({
      data: { listingId, url, isPrimary, sortOrder },
    });
  }

  async removeImage(imageId: number) {
    const img = await this.prisma.foreignListingImage.findUnique({
      where: { id: imageId },
    });
    if (!img) throw new NotFoundException(`Image #${imageId} not found`);
    return this.prisma.foreignListingImage.delete({ where: { id: imageId } });
  }

  async setPrimaryImage(listingId: number, imageId: number) {
    await this.findOne(listingId);
    await this.prisma.foreignListingImage.updateMany({
      where: { listingId },
      data: { isPrimary: false },
    });
    return this.prisma.foreignListingImage.update({
      where: { id: imageId },
      data: { isPrimary: true },
    });
  }
}
