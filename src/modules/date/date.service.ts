import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";

import { LanguageEnum } from "@/enums/language.enum";

import { capitalize } from "@/utils/capitalize.utils";

import { DateEntity } from "./date.entity";

import { DateDto } from "./dtos/date.dto";
import { UpdateDateDto } from "./dtos/update-date.dto";

@Injectable()
export class DateService {
  constructor(@InjectRepository(DateEntity) private readonly dateRepository: Repository<DateEntity>) {}

  // FIND
  async find(language?: LanguageEnum) {
    let date = await this.dateRepository.findOne({ where: { id: 1 } });
    if (!date) date = await this.dateRepository.save({ id: 1 });

    const parsedDate: DateDto = this.parse(date, language);

    return parsedDate;
  }

  async findWithContents() {
    const date = await this.dateRepository.findOne({ where: { id: 1 } });
    if (!date) return this.dateRepository.save({ id: 1 });

    return date;
  }

  // UPDATE
  async update({ ...dto }: UpdateDateDto) {
    return this.dateRepository.save({ ...dto, id: 1 });
  }

  // PARSERS
  parse(date: DateEntity, language: LanguageEnum) {
    const newDate: DateDto = plainToClass(DateDto, date, { excludeExtraneousValues: true });

    newDate.body = date[`body${capitalize(language)}`];

    return newDate;
  }
}
