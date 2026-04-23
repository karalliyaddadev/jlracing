import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { SiteType } from "@prisma/client";

export class CreateGalleryItemDto {
  @IsEnum(SiteType)
  site: SiteType;

  @IsString()
  mediaUrl: string;

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  mediaType?: string; // "video" | "image"

  @IsOptional()
  @IsString()
  aspectRatio?: string;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
