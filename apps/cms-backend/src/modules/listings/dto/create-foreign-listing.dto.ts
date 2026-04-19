import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateForeignListingDto {
  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsNumber()
  @Type(() => Number)
  year: number;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsString()
  pdfUrl: string;

  @IsOptional()
  @IsString()
  category?: string; // "2-Wheelers" | "Automobiles" | "Heavy Machinery"

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
