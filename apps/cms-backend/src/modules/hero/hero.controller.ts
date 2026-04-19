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
import { HeroService } from "./hero.service";
import { CreateHeroImageDto } from "./dto/create-hero.dto";
import { UpdateHeroImageDto } from "./dto/update-hero.dto";

@Controller("hero")
export class HeroController {
  constructor(private heroService: HeroService) {}

  // Public: frontends fetch active hero images
  @Public()
  @Get("active")
  getActive(@Query("site") site: SiteType) {
    return this.heroService.findActive(site);
  }

  // Admin: list all (optionally filtered by site)
  @Get()
  findAll(@Query("site") site?: SiteType) {
    return this.heroService.findAll(site);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.heroService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateHeroImageDto) {
    return this.heroService.create(dto);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateHeroImageDto,
  ) {
    return this.heroService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.heroService.remove(id);
  }
}
