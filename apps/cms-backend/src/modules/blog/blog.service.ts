import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../common/database/prisma.service";
import { CreateBlogPostDto } from "./dto/create-blog-post.dto";
import { UpdateBlogPostDto } from "./dto/update-blog-post.dto";

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  // Admin: all posts
  findAll() {
    return this.prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" } });
  }

  // Public: published only, paginated
  async findPublished(page = 1, limit = 6) {
    const skip = (page - 1) * limit;
    const [posts, total] = await Promise.all([
      this.prisma.blogPost.findMany({
        where: { isPublished: true },
        orderBy: { publishedAt: "desc" },
        skip,
        take: limit,
      }),
      this.prisma.blogPost.count({ where: { isPublished: true } }),
    ]);
    return { posts, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const post = await this.prisma.blogPost.findUnique({ where: { id } });
    if (!post) throw new NotFoundException(`BlogPost #${id} not found`);
    return post;
  }

  create(dto: CreateBlogPostDto) {
    return this.prisma.blogPost.create({
      data: {
        ...dto,
        publishedAt: dto.publishedAt ? new Date(dto.publishedAt) : new Date(),
      },
    });
  }

  async update(id: number, dto: UpdateBlogPostDto) {
    await this.findOne(id);
    const data: any = { ...dto };
    if (dto.publishedAt) data.publishedAt = new Date(dto.publishedAt);
    return this.prisma.blogPost.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.blogPost.delete({ where: { id } });
  }
}
