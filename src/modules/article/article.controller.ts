import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  BadRequestException,
  Query,
} from "@nestjs/common";

import { ISort } from "@/interfaces/sort.interface";
import { IPagination } from "@/interfaces/pagination.interface";

import { UserOrAdminJwtGuard } from "@guards/user-admin-jwt.guard";

import { ArticleEntity } from "./article.entity";

import { ArticleService } from "./article.service";

import { CreateArticleDto } from "./dtos/create-article.dto";
import { UpdateArticleDto } from "./dtos/update-article.dto";
import { AdminJwtGuard } from "@/guards/admin-jwt.guard";

@Controller("article")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // GET
  @Get("get-all")
  @UseGuards(UserOrAdminJwtGuard)
  async getAll() {
    return this.articleService.findAll();
  }

  @Get("get-by-id/:id")
  @UseGuards(UserOrAdminJwtGuard)
  async getById(@Param("id", new ParseIntPipe()) id: number) {
    return this.articleService.findById(id);
  }

  @Get("get-by-user/:id")
  @UseGuards(UserOrAdminJwtGuard)
  async getByUser(@Param("id", new ParseIntPipe()) id: number) {
    return this.articleService.findByUser(id);
  }

  @Get("get-by-token/:token")
  @UseGuards(UserOrAdminJwtGuard)
  async getByToken(@Param("token") token: string) {
    return this.articleService.findByToken(token);
  }

  @Get("get-with-count")
  @UseGuards(AdminJwtGuard)
  async getWithCount(@Query() sort: ISort<keyof ArticleEntity>, @Query() pagination: IPagination) {
    return this.articleService.findWithCount(sort, pagination);
  }

  // @Get("get-with-contents/:articleId")
  // async getOne(@Param("articleId", new ParseIntPipe()) articleId: number) {
  //   return this.articleService.findWithContents(articleId);
  // }

  // POST
  @Post("create")
  @UseGuards(UserOrAdminJwtGuard)
  async create(@Body() dto: CreateArticleDto) {
    return this.articleService.create(dto);
  }

  // PUT
  @Put("update/:id")
  @UseGuards(UserOrAdminJwtGuard)
  async update(@Param("id", new ParseIntPipe()) id: number, @Body() dto: UpdateArticleDto) {
    const article = await this.articleService.findById(id);
    if (!article) throw new BadRequestException("not found");

    return this.articleService.update(dto, id);
  }

  // DELETE
  @Delete("delete/:id")
  @UseGuards(UserOrAdminJwtGuard)
  async delete(@Param("id", new ParseIntPipe()) id: number) {
    const article = await this.articleService.findById(id);
    if (!article) throw new BadRequestException("not found");

    return this.articleService.delete(id);
  }
}
