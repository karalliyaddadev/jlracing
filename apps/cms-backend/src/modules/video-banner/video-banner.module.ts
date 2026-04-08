import { Module } from "@nestjs/common";
import { VideoBannerController } from "./video-banner.controller";
import { VideoBannerService } from "./video-banner.service";

@Module({
  controllers: [VideoBannerController],
  providers: [VideoBannerService],
})
export class VideoBannerModule {}
