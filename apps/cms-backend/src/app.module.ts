import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./common/database/prisma.module";
import { JwtAuthGuard } from "./common/guards/jwt-auth.guard";
import { AuthModule } from "./modules/auth/auth.module";
import { HeroModule } from "./modules/hero/hero.module";
import { VideoBannerModule } from "./modules/video-banner/video-banner.module";
import { GalleryModule } from "./modules/gallery/gallery.module";
import { BlogModule } from "./modules/blog/blog.module";
import { ListingsModule } from "./modules/listings/listings.module";
import { FaqModule } from "./modules/faq/faq.module";
import { UploadModule } from "./modules/upload/upload.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    HeroModule,
    VideoBannerModule,
    GalleryModule,
    BlogModule,
    ListingsModule,
    FaqModule,
    UploadModule,
  ],
  providers: [
    // Apply JWT guard globally — use @Public() to bypass
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
