import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from "class-validator";
import { SiteType } from "../../../../generated/prisma";

export class CreateHeroImageDto {
  @IsEnum(SiteType)
  site: SiteType;

  @IsString()
  desktopImage: string;

  @IsString()
  mobileImage: string;

  @IsString()
  buttonLink: string;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
