import { IsBoolean, IsDateString, IsOptional, IsString } from "class-validator";

export class CreateBlogPostDto {
  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsString()
  imageRatio?: string;

  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  article: string;

  @IsOptional()
  @IsDateString()
  publishedAt?: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
