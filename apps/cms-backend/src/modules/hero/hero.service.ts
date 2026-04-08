import { Injectable, NotFoundException } from "@nestjs/common";
import { SiteType } from "@prisma/client";
import { PrismaService } from "../../common/database/prisma.service";
import { CreateHeroImageDto } from "./dto/create-hero.dto";
import { UpdateHeroImageDto } from "./dto/update-hero.dto";

@Injectable()
export class HeroService {
  constructor(private prisma: PrismaService) {}

  findAll(site?: SiteType) {
    return this.prisma.heroImage.findMany({
      where: site ? { site } : undefined,
      orderBy: [{ site: "asc" }, { order: "asc" }],
    });
  }

  findActive(site: SiteType) {
    return this.prisma.heroImage.findMany({
      where: { site, isActive: true },
      orderBy: { order: "asc" },
    });
  }

  async findOne(id: number) {
    const item = await this.prisma.heroImage.findUnique({ where: { id } });
    if (!item) throw new NotFoundException(`HeroImage #${id} not found`);
    return item;
  }

  create(dto: CreateHeroImageDto) {
    return this.prisma.heroImage.create({ data: dto });
  }

  async update(id: number, dto: UpdateHeroImageDto) {
    await this.findOne(id);
    return this.prisma.heroImage.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.heroImage.delete({ where: { id } });
  }
}
