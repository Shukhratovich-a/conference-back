import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";

import { LanguageEnum } from "@/enums/language.enum";
import { IPagination } from "@/interfaces/pagination.interface";

import { capitalize } from "@/utils/capitalize.utils";

import { SectionEntity } from "./section.entity";

import { SectionDto } from "./dtos/section.dto";
import { CreateSectionDto } from "./dtos/create-section.dto";
import { UpdateSectionDto } from "./dtos/update-section.dto";

@Injectable()
export class SectionService {
  constructor(@InjectRepository(SectionEntity) private readonly sectionRepository: Repository<SectionEntity>) {}

  // FIND
  async findAll(language?: LanguageEnum) {
    const sections = await this.sectionRepository.find();
    if (!sections) return [];

    const parsedSections: SectionDto[] = sections.map((section) => this.parse(section, language));

    return parsedSections;
  }

  async findWithCount({ page, limit }: IPagination) {
    const [sections, total] = await this.sectionRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit || 0,
    });

    return { data: sections, total };
  }

  async findById(id: number, language?: LanguageEnum) {
    const section = await this.sectionRepository.findOne({ where: { id } });
    if (!section) return null;

    const parsedSection: SectionDto = this.parse(section, language);

    return parsedSection;
  }

  async findWithContents(id: number) {
    return this.sectionRepository.findOne({ where: { id } });
  }

  // CREATE
  async create({ ...dto }: CreateSectionDto) {
    return this.sectionRepository.save(this.sectionRepository.create({ ...dto }));
  }

  // UPDATE
  async update({ ...dto }: UpdateSectionDto, id: number) {
    return this.sectionRepository.save({ ...dto, id });
  }

  // DELETE
  async delete(id: number) {
    return this.sectionRepository.delete(id);
  }

  // PARSERS
  parse(section: SectionEntity, language: LanguageEnum) {
    const newSection: SectionDto = plainToClass(SectionDto, section, { excludeExtraneousValues: true });

    newSection.title = section[`title${capitalize(language)}`];

    return newSection;
  }
}
