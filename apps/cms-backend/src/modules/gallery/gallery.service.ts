import { Injectable, NotFoundException } from "@nestjs/common";
import { SiteType } from "@prisma/client";
import { PrismaService } from "../../common/database/prisma.service";
import { CreateGalleryItemDto } from "./dto/create-gallery-item.dto";
import { UpdateGalleryItemDto } from "./dto/update-gallery-item.dto";

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}

  findAll(site?: SiteType) {
    return this.prisma.galleryItem.findMany({
      where: site ? { site } : undefined,
      orderBy: [{ site: "asc" }, { order: "asc" }],
    });
  }

  findActive(site: SiteType, page = 1, limit = 12) {
    const skip = (page - 1) * limit;
    return this.prisma.galleryItem.findMany({
      where: { site, isActive: true },
      orderBy: { order: "asc" },
      skip,
      take: limit,
    });
  }

  async countActive(site: SiteType) {
    return this.prisma.galleryItem.count({ where: { site, isActive: true } });
  }

  async findOne(id: number) {
    const item = await this.prisma.galleryItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException(`GalleryItem #${id} not found`);
    return item;
  }

  create(dto: CreateGalleryItemDto) {
    return this.prisma.galleryItem.create({ data: dto });
  }

  async update(id: number, dto: UpdateGalleryItemDto) {
    await this.findOne(id);
    return this.prisma.galleryItem.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.galleryItem.delete({ where: { id } });
  }
}
