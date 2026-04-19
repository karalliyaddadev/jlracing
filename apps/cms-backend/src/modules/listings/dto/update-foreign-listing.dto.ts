import { PartialType } from "@nestjs/mapped-types";
import { CreateForeignListingDto } from "./create-foreign-listing.dto";

export class UpdateForeignListingDto extends PartialType(
  CreateForeignListingDto,
) {}
