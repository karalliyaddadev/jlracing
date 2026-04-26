import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../common/database/prisma.service";
import { SubscribeDto } from "./dto/newsletter.dto";

@Injectable()
export class NewsletterService {
  constructor(private prisma: PrismaService) {}

  async subscribe(dto: SubscribeDto) {
    const existing = await this.prisma.newsletterSubscriber.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException("This email is already subscribed.");
    }
    await this.prisma.newsletterSubscriber.create({ data: { email: dto.email } });
    return { success: true, message: "Subscribed successfully" };
  }

  findAll() {
    return this.prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async remove(id: string) {
    await this.prisma.newsletterSubscriber.delete({ where: { id } });
    return { success: true, message: "Subscriber removed" };
  }
}
