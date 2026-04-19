import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../common/database/prisma.service";
import { CreateForeignListingDto } from "./dto/create-foreign-listing.dto";
import { UpdateForeignListingDto } from "./dto/update-foreign-listing.dto";

@Injectable()
export class ListingsService {
  constructor(private prisma: PrismaService) {}

  findAll(category?: string) {
    return this.prisma.foreignListing.findMany({
      where: category ? { category } : undefined,
      orderBy: { createdAt: "desc" },
    });
  }

  findActive(category?: string, page = 1, limit = 6) {
    const skip = (page - 1) * limit;
    return this.prisma.foreignListing.findMany({
      where: { isActive: true, ...(category ? { category } : {}) },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    });
  }

  async countActive(category?: string) {
    return this.prisma.foreignListing.count({
      where: { isActive: true, ...(category ? { category } : {}) },
    });
  }

  async findOne(id: number) {
    const item = await this.prisma.foreignListing.findUnique({ where: { id } });
    if (!item) throw new NotFoundException(`Listing #${id} not found`);
    return item;
  }

  create(dto: CreateForeignListingDto) {
    return this.prisma.foreignListing.create({ data: dto });
  }

  async update(id: number, dto: UpdateForeignListingDto) {
    await this.findOne(id);
    return this.prisma.foreignListing.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.foreignListing.delete({ where: { id } });
  }
}
