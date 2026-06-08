import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { Public } from "../../common/decorators/public.decorator";
import { NewsletterService } from "./newsletter.service";
import { SubscribeDto } from "./dto/newsletter.dto";

@Controller("newsletter")
export class NewsletterController {
  constructor(private newsletterService: NewsletterService) {}

  @Public()
  @Post("subscribe")
  subscribe(@Body() dto: SubscribeDto) {
    return this.newsletterService.subscribe(dto);
  }

  @Get()
  findAll() {
    return this.newsletterService.findAll();
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.newsletterService.remove(id);
  }
}
