import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateForeignListingDto {
  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  year?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  price?: number;

  @IsOptional()
  @IsString()
  category?: string; // "2-Wheelers" | "Automobiles" | "Heavy Machinery"

  @IsOptional()
  @IsIn(["brandnew", "reconditioned", "used"])
  condition?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  mileage?: number;

  @IsOptional()
  @IsString()
  colour?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  engineCc?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
