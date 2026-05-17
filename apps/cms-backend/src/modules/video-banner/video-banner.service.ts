import { Injectable, NotFoundException } from "@nestjs/common";
import { SiteType } from "../../../generated/prisma";
import { PrismaService } from "../../common/database/prisma.service";
import { CreateVideoBannerDto } from "./dto/create-video-banner.dto";
import { UpdateVideoBannerDto } from "./dto/update-video-banner.dto";

@Injectable()
export class VideoBannerService {
  constructor(private prisma: PrismaService) {}

  findAll(site?: SiteType) {
    return this.prisma.videoBanner.findMany({
      where: site ? { site } : undefined,
      orderBy: { createdAt: "desc" },
    });
  }

  findActive(site: SiteType) {
    return this.prisma.videoBanner.findFirst({
      where: { site, isActive: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: number) {
    const item = await this.prisma.videoBanner.findUnique({ where: { id } });
    if (!item) throw new NotFoundException(`VideoBanner #${id} not found`);
    return item;
  }

  create(dto: CreateVideoBannerDto) {
    return this.prisma.videoBanner.create({ data: dto });
  }

  async update(id: number, dto: UpdateVideoBannerDto) {
    await this.findOne(id);
    return this.prisma.videoBanner.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.videoBanner.delete({ where: { id } });
  }
}
