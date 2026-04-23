import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { Public } from "../../common/decorators/public.decorator";
import { BlogService } from "./blog.service";
import { CreateBlogPostDto } from "./dto/create-blog-post.dto";
import { UpdateBlogPostDto } from "./dto/update-blog-post.dto";

@Controller("blog")
export class BlogController {
  constructor(private blogService: BlogService) {}

  // Public: published posts
  @Public()
  @Get("published")
  getPublished(@Query("page") page = "1", @Query("limit") limit = "6") {
    return this.blogService.findPublished(
      parseInt(page, 10),
      parseInt(limit, 10),
    );
  }

  // Public: single published post
  @Public()
  @Get("published/:id")
  getPublishedOne(@Param("id", ParseIntPipe) id: number) {
    return this.blogService.findOne(id);
  }

  // Admin: all posts
  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.blogService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateBlogPostDto) {
    return this.blogService.create(dto);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateBlogPostDto,
  ) {
    return this.blogService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.blogService.remove(id);
  }
}
