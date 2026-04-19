import { PartialType } from "@nestjs/mapped-types";
import { CreateHeroImageDto } from "./create-hero.dto";

export class UpdateHeroImageDto extends PartialType(CreateHeroImageDto) {}
