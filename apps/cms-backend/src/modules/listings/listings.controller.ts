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

  // Public: active listings for frontends (paginated)
  @Public()
  @Get("active")
  async getActive(
    @Query("category") category?: string,
    @Query("page") page = "1",
    @Query("limit") limit = "6",
  ) {
    const p = parseInt(page, 10);
    const l = parseInt(limit, 10);
    const [items, total] = await Promise.all([
      this.listingsService.findActive(category, p, l),
      this.listingsService.countActive(category),
    ]);
    return {
      items,
      total,
      page: p,
      limit: l,
      totalPages: Math.ceil(total / l),
    };
  }

  // Admin: all listings
  @Get()
  findAll(@Query("category") category?: string) {
    return this.listingsService.findAll(category);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.listingsService.findOne(id);
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
}
