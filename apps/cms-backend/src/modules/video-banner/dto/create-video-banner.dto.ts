import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { SiteType } from "../../../../generated/prisma";

export class CreateVideoBannerDto {
  @IsEnum(SiteType)
  site: SiteType;

  @IsString()
  videoUrl: string;

  @IsOptional()
  @IsString()
  aspectRatio?: string;

  @IsOptional()
  @IsNumber()
  durationSec?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
