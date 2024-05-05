import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";

import { LanguageEnum } from "@/enums/language.enum";

import { capitalize } from "@/utils/capitalize.utils";

import { HomepageEntity } from "./homepage.entity";

import { HomepageDto } from "./dtos/homepage.dto";
import { UpdateHomepageDto } from "./dtos/update-homepage.dto";

@Injectable()
export class HomepageService {
  constructor(@InjectRepository(HomepageEntity) private readonly homepageRepository: Repository<HomepageEntity>) {}

  async find(language?: LanguageEnum) {
    let homepage = await this.homepageRepository.findOne({ where: { id: 1 } });
    if (!homepage) homepage = await this.homepageRepository.save({ id: 1 });

    const parsedHomepage: HomepageDto = this.parse(homepage, language);

    return parsedHomepage;
  }

  async findWithContents() {
    const homepage = await this.homepageRepository.findOne({ where: { id: 1 } });
    if (!homepage) return this.homepageRepository.save({ id: 1 });

    homepage.poster = process.env.HOST + homepage.poster;

    return homepage;
  }

  // UPDATE
  async update({ ...dto }: UpdateHomepageDto) {
    return this.homepageRepository.save({ ...dto, id: 1 });
  }

  // PARSERS
  parse(homepage: HomepageEntity, language: LanguageEnum) {
    const newHomepage: HomepageDto = plainToClass(HomepageDto, homepage, { excludeExtraneousValues: true });

    newHomepage.title = homepage[`title${capitalize(language)}`];
    newHomepage.mainText = homepage[`mainText${capitalize(language)}`];

    return newHomepage;
  }
}
