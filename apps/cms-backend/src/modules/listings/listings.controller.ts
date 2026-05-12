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
import { Public } from "../../common/decorators/public.decorator";
import { ListingsService } from "./listings.service";
import { CreateForeignListingDto } from "./dto/create-foreign-listing.dto";
import { UpdateForeignListingDto } from "./dto/update-foreign-listing.dto";

@Controller("listings")
export class ListingsController {
  constructor(private listingsService: ListingsService) {}

  // Public: active listings for foreignfrontend (paginated, returns "vehicles" key)
  @Public()
  @Get("active")
  async getActive(
    @Query("category") category?: string,
    @Query("page") page = "1",
    @Query("limit") limit = "6",
  ) {
    const p = parseInt(page, 10);
    const l = parseInt(limit, 10);
    const [vehicles, total] = await Promise.all([
      this.listingsService.findActive(category, p, l),
      this.listingsService.countActive(category),
    ]);
    return {
      vehicles,
      total,
      page: p,
      limit: l,
      totalPages: Math.ceil(total / l),
    };
  }

  // Public: single listing by id (for detail page)
  @Public()
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.listingsService.findOne(id);
  }

  // Admin: all listings (with optional category filter)
  @Get()
  findAll(@Query("category") category?: string) {
    return this.listingsService.findAll(category);
  }

  @Post()
  create(@Body() dto: CreateForeignListingDto) {
    return this.listingsService.create(dto);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateForeignListingDto,
  ) {
    return this.listingsService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.listingsService.remove(id);
  }

  // ── Image management ──────────────────────────────────────────────────────

  @Post(":id/images")
  addImage(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: { url: string; isPrimary?: boolean; sortOrder?: number },
  ) {
    return this.listingsService.addImage(
      id,
      body.url,
      body.isPrimary ?? false,
      body.sortOrder ?? 0,
    );
  }

  @Delete(":id/images/:imageId")
  removeImage(
    @Param("id", ParseIntPipe) _listingId: number,
    @Param("imageId", ParseIntPipe) imageId: number,
  ) {
    return this.listingsService.removeImage(imageId);
  }

  @Patch(":id/images/:imageId/primary")
  setPrimary(
    @Param("id", ParseIntPipe) listingId: number,
    @Param("imageId", ParseIntPipe) imageId: number,
  ) {
    return this.listingsService.setPrimaryImage(listingId, imageId);
  }
}
