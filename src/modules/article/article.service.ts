import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";

import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";

import { IPagination } from "@/interfaces/pagination.interface";
import { LanguageEnum } from "@/enums/language.enum";
import { ISort } from "@/interfaces/sort.interface";

import { capitalize } from "@/utils/capitalize.utils";

import { ArticleEntity } from "./article.entity";

import { ArticleDto } from "./dtos/article.dto";
import { CreateArticleDto } from "./dtos/create-article.dto";
import { UpdateArticleDto } from "./dtos/update-article.dto";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity) private readonly articleRepository: Repository<ArticleEntity>,
    private jwtService: JwtService,
  ) {}

  // FIND
  async findAll(language: LanguageEnum) {
    const articles = await this.articleRepository.find({
      relations: { section: true, user: true },
      where: { user: true, section: true },
    });
    if (!articles) return [];

    const parsedArticles: ArticleDto[] = articles.map((article) => this.parse(article, language));

    return parsedArticles;
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

  // PARSERS
  parse(article: ArticleEntity, language: LanguageEnum) {
    const newArticle: ArticleDto = plainToClass(ArticleDto, article, { excludeExtraneousValues: true });

    if (article.section) {
      newArticle.section = {
        id: article.section.id,
        title: article.section[`title${capitalize(language)}`],
        createAt: article.section.createAt,
        updateAt: article.section.updateAt,
      };
    }

    if (article.user) newArticle.user = article.user;

    return newArticle;
  }
}
