import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, BadRequestException } from "@nestjs/common";

import { UserOrAdminJwtGuard } from "@guards/user-admin-jwt.guard";

import { ArticleService } from "./article.service";

import { CreateArticleDto } from "./dtos/create-article.dto";
import { UpdateArticleDto } from "./dtos/update-article.dto";

@Controller("article")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // GET
  @Get("get-all")
  async getAll() {
    return this.articleService.findAll();
  }

  @Get("get-by-id/:id")
  async getById(@Param("id", new ParseIntPipe()) id: number) {
    return this.articleService.findById(id);
  }

  @UseGuards(UserOrAdminJwtGuard)
  @Get("get-by-user/:id")
  async getByUser(@Param("id", new ParseIntPipe()) id: number) {
    return this.articleService.findByUser(id);
  }

  @UseGuards(UserOrAdminJwtGuard)
  @Get("get-by-token/:token")
  async getByToken(@Param("token") token: string) {
    return this.articleService.findByToken(token);
  }

  // POST
  @UseGuards(UserOrAdminJwtGuard)
  @Post("create")
  async create(@Body() dto: CreateArticleDto) {
    return this.articleService.create(dto);
  }

  // PUT
  @UseGuards(UserOrAdminJwtGuard)
  @Put("update/:id")
  async update(@Param("id", new ParseIntPipe()) id: number, @Body() dto: UpdateArticleDto) {
    const article = await this.articleService.findById(id);
    if (!article) throw new BadRequestException("not found");

    return this.articleService.update(dto, id);
  }

  // DELETE
  @UseGuards(UserOrAdminJwtGuard)
  @Delete("delete/:id")
  async delete(@Param("id", new ParseIntPipe()) id: number) {
    const article = await this.articleService.findById(id);
    if (!article) throw new BadRequestException("not found");

    return this.articleService.delete(id);
  }
}
