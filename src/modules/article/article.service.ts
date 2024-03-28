import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";

import { Repository } from "typeorm";

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
