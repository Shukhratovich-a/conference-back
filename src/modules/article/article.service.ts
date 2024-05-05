import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";

import { Repository } from "typeorm";

import { IPagination } from "@/interfaces/pagination.interface";
import { ISort } from "@/interfaces/sort.interface";

import { ArticleEntity } from "./article.entity";

import { CreateArticleDto } from "./dtos/create-article.dto";
import { UpdateArticleDto } from "./dtos/update-article.dto";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity) private readonly articleRepository: Repository<ArticleEntity>,
    private jwtService: JwtService,
  ) {}

  // FIND
  async findAll() {
    return this.articleRepository.find({ relations: { user: true, section: true } });
  }

  async findById(id: number) {
    return this.articleRepository.findOne({ where: { id } });
  }

  async findByUser(id: number) {
    return this.articleRepository.find({ where: { user: { id } } });
  }

  async findByToken(token: string) {
    try {
      const { email } = await this.jwtService.verifyAsync(token);
      if (!email) throw new UnauthorizedException();

      return this.articleRepository.find({ where: { user: { email } } });
    } catch {
      throw new UnauthorizedException();
    }
  }

  async findWithCount({ sort = "createAt", order = "asc" }: ISort<keyof ArticleEntity>, { page = 1, limit = 0 }: IPagination) {
    let currentOrder = { [sort]: order } as unknown;
    if (sort === "section" || sort === "user") currentOrder = { [sort]: { id: order } };

    const [articles, total] = await this.articleRepository.findAndCount({
      relations: { user: true, section: true },
      take: limit,
      skip: (page - 1) * limit,
      order: currentOrder,
    });
    if (!articles) return [];

    return {
      data: articles.map((article) => {
        article.file = process.env.HOST + article.file;
        return article;
      }),
      total,
    };
  }

  // CREATE
  async create({ userId, sectionId, ...dto }: CreateArticleDto) {
    return this.articleRepository.save(
      this.articleRepository.create({ ...dto, user: { id: userId }, section: { id: sectionId } }),
    );
  }

  // UPDATE
  async update({ ...dto }: UpdateArticleDto, id: number) {
    return this.articleRepository.save({ ...dto, id });
  }

  // DELETE
  async delete(id: number) {
    return this.articleRepository.delete(id);
  }
}
