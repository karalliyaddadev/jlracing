import { PartialType } from "@nestjs/mapped-types";
import { CreateVideoBannerDto } from "./create-video-banner.dto";

export class UpdateVideoBannerDto extends PartialType(CreateVideoBannerDto) {}
