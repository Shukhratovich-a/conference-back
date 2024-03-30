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
    const section = await this.homepageRepository.findOne({ where: { id: 1 } });
    if (!section) return null;

    const parsedHomepage: HomepageDto = this.parse(section, language);

    return parsedHomepage;
  }

  async findWithContents() {
    return this.homepageRepository.findOne({ where: { id: 1 } });
  }

  // UPDATE
  async update({ ...dto }: UpdateHomepageDto) {
    return this.homepageRepository.save({ ...dto, id: 1 });
  }

  // PARSERS
  parse(section: HomepageEntity, language: LanguageEnum) {
    const newSection: HomepageDto = plainToClass(HomepageDto, section, { excludeExtraneousValues: true });

    newSection.mainText = section[`mainText${capitalize(language)}`];

    return newSection;
  }
}
