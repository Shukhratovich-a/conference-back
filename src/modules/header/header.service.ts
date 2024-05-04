import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";

import { LanguageEnum } from "@/enums/language.enum";

import { capitalize } from "@/utils/capitalize.utils";

import { HeaderEntity } from "./header.entity";

import { HeaderDto } from "./dtos/header.dto";
import { UpdateHeaderDto } from "./dtos/update-header.dto";

@Injectable()
export class HeaderService {
  constructor(@InjectRepository(HeaderEntity) private readonly headerRepository: Repository<HeaderEntity>) {}

  async find(language?: LanguageEnum) {
    const section = await this.headerRepository.findOne({ where: { id: 1 } });
    if (!section) return null;

    const parsedHeader: HeaderDto = this.parse(section, language);

    return parsedHeader;
  }

  async findWithContents() {
    const header = await this.headerRepository.findOne({ where: { id: 1 } });

    if (!header) return this.headerRepository.save({ id: 1 });

    header.logo = process.env.HOST + header.logo;

    return header;
  }

  // UPDATE
  async update({ ...dto }: UpdateHeaderDto) {
    return this.headerRepository.save({ ...dto, id: 1 });
  }

  // PARSERS
  parse(section: HeaderEntity, language: LanguageEnum) {
    const newSection: HeaderDto = plainToClass(HeaderDto, section, { excludeExtraneousValues: true });

    newSection.mainText = section[`mainText${capitalize(language)}`];

    return newSection;
  }
}
