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
import { VideoBannerService } from "./video-banner.service";
import { CreateVideoBannerDto } from "./dto/create-video-banner.dto";
import { UpdateVideoBannerDto } from "./dto/update-video-banner.dto";

@Controller("video-banner")
export class VideoBannerController {
  constructor(private videoBannerService: VideoBannerService) {}

  // Public: frontends fetch active banner
  @Public()
  @Get("active")
  getActive(@Query("site") site: SiteType) {
    return this.videoBannerService.findActive(site);
  }

  @Get()
  findAll(@Query("site") site?: SiteType) {
    return this.videoBannerService.findAll(site);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.videoBannerService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateVideoBannerDto) {
    return this.videoBannerService.create(dto);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateVideoBannerDto,
  ) {
    return this.videoBannerService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.videoBannerService.remove(id);
  }
}
