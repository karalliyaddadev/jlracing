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
import { SiteType } from "../../../generated/prisma";
import { Public } from "../../common/decorators/public.decorator";
import { GalleryService } from "./gallery.service";
import { CreateGalleryItemDto } from "./dto/create-gallery-item.dto";
import { UpdateGalleryItemDto } from "./dto/update-gallery-item.dto";

@Controller("gallery")
export class GalleryController {
  constructor(private galleryService: GalleryService) {}

  // Public: paginated gallery for frontends
  @Public()
  @Get("active")
  async getActive(
    @Query("site") site: SiteType,
    @Query("page") page = "1",
    @Query("limit") limit = "12",
  ) {
    const p = parseInt(page, 10);
    const l = parseInt(limit, 10);
    const [items, total] = await Promise.all([
      this.galleryService.findActive(site, p, l),
      this.galleryService.countActive(site),
    ]);
    return {
      items,
      total,
      page: p,
      limit: l,
      totalPages: Math.ceil(total / l),
    };
  }

  @Get()
  findAll(@Query("site") site?: SiteType) {
    return this.galleryService.findAll(site);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.galleryService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateGalleryItemDto) {
    return this.galleryService.create(dto);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateGalleryItemDto,
  ) {
    return this.galleryService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.galleryService.remove(id);
  }
}
