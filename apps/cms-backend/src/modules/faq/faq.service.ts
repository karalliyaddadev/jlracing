import { Injectable, NotFoundException } from "@nestjs/common";
import { SiteType } from "@prisma/client";
import { PrismaService } from "../../common/database/prisma.service";
import {
  CreateFaqCategoryDto,
  UpdateFaqCategoryDto,
  CreateFaqItemDto,
  UpdateFaqItemDto,
} from "./dto/faq.dto";

@Injectable()
export class FaqService {
  constructor(private prisma: PrismaService) {}

  // ── Categories ────────────────────────────────────────────────────────────

  findAllCategories(site?: SiteType) {
    return this.prisma.faqCategory.findMany({
      where: site ? { site } : undefined,
      orderBy: [{ site: "asc" }, { order: "asc" }],
      include: {
        items: { where: { isActive: true }, orderBy: { order: "asc" } },
      },
    });
  }

  findActiveCategories(site: SiteType) {
    return this.prisma.faqCategory.findMany({
      where: { site, isActive: true },
      orderBy: { order: "asc" },
      include: {
        items: { where: { isActive: true }, orderBy: { order: "asc" } },
      },
    });
  }

  async findOneCategory(id: number) {
    const cat = await this.prisma.faqCategory.findUnique({
      where: { id },
      include: { items: { orderBy: { order: "asc" } } },
    });
    if (!cat) throw new NotFoundException(`FaqCategory #${id} not found`);
    return cat;
  }

  createCategory(dto: CreateFaqCategoryDto) {
    return this.prisma.faqCategory.create({ data: dto });
  }

  async updateCategory(id: number, dto: UpdateFaqCategoryDto) {
    await this.findOneCategory(id);
    return this.prisma.faqCategory.update({ where: { id }, data: dto });
  }

  async removeCategory(id: number) {
    await this.findOneCategory(id);
    return this.prisma.faqCategory.delete({ where: { id } });
  }

  // ── Items ─────────────────────────────────────────────────────────────────

  findAllItems(categoryId?: number) {
    return this.prisma.faqItem.findMany({
      where: categoryId ? { categoryId } : undefined,
      orderBy: [{ categoryId: "asc" }, { order: "asc" }],
    });
  }

  async findOneItem(id: number) {
    const item = await this.prisma.faqItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException(`FaqItem #${id} not found`);
    return item;
  }

  async createItem(dto: CreateFaqItemDto) {
    // Verify category exists
    await this.findOneCategory(dto.categoryId);
    return this.prisma.faqItem.create({ data: dto });
  }

  async updateItem(id: number, dto: UpdateFaqItemDto) {
    await this.findOneItem(id);
    return this.prisma.faqItem.update({ where: { id }, data: dto });
  }

  async removeItem(id: number) {
    await this.findOneItem(id);
    return this.prisma.faqItem.delete({ where: { id } });
  }
}
