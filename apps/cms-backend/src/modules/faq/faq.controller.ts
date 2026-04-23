import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { SiteType } from "@prisma/client";
import { Public } from "../../common/decorators/public.decorator";
import { FaqService } from "./faq.service";
import {
  CreateFaqCategoryDto,
  UpdateFaqCategoryDto,
  CreateFaqItemDto,
  UpdateFaqItemDto,
} from "./dto/faq.dto";

@Controller("faq")
export class FaqController {
  constructor(private faqService: FaqService) {}

  // ── Public: active categories + items ─────────────────────────────────────

  @Public()
  @Get("active")
  getActive(@Query("site") site: SiteType) {
    return this.faqService.findActiveCategories(site);
  }

  // ── Admin: Categories CRUD ─────────────────────────────────────────────────

  @Get("categories")
  findAllCategories(@Query("site") site?: SiteType) {
    return this.faqService.findAllCategories(site);
  }

  @Get("categories/:id")
  findOneCategory(@Param("id", ParseIntPipe) id: number) {
    return this.faqService.findOneCategory(id);
  }

  @Post("categories")
  createCategory(@Body() dto: CreateFaqCategoryDto) {
    return this.faqService.createCategory(dto);
  }

  @Patch("categories/:id")
  updateCategory(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateFaqCategoryDto,
  ) {
    return this.faqService.updateCategory(id, dto);
  }

  @Delete("categories/:id")
  removeCategory(@Param("id", ParseIntPipe) id: number) {
    return this.faqService.removeCategory(id);
  }

  // ── Admin: Items CRUD ──────────────────────────────────────────────────────

  @Get("items")
  findAllItems(@Query("categoryId") categoryId?: string) {
    return this.faqService.findAllItems(
      categoryId ? parseInt(categoryId, 10) : undefined,
    );
  }

  @Get("items/:id")
  findOneItem(@Param("id", ParseIntPipe) id: number) {
    return this.faqService.findOneItem(id);
  }

  @Post("items")
  createItem(@Body() dto: CreateFaqItemDto) {
    return this.faqService.createItem(dto);
  }

  @Patch("items/:id")
  updateItem(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateFaqItemDto,
  ) {
    return this.faqService.updateItem(id, dto);
  }

  @Delete("items/:id")
  removeItem(@Param("id", ParseIntPipe) id: number) {
    return this.faqService.removeItem(id);
  }
}
