import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";

import { LanguageEnum } from "@/enums/language.enum";
import { IPagination } from "@/interfaces/pagination.interface";

import { capitalize } from "@/utils/capitalize.utils";

import { OrganizerEntity } from "./organizer.entity";

import { OrganizerDto } from "./dtos/organizer.dto";
import { CreateOrganizerDto } from "./dtos/create-organizer.dto";
import { UpdateOrganizerDto } from "./dtos/update-organizer.dto";

@Injectable()
export class OrganizerService {
  constructor(@InjectRepository(OrganizerEntity) private readonly organizerRepository: Repository<OrganizerEntity>) {}

  // FIND
  async findAll(language?: LanguageEnum) {
    const organizers = await this.organizerRepository.find({
      relations: { organizerRole: true },
      order: { organizerRole: { id: "ASC" } },
    });
    if (!organizers) return [];

    const parsedOrganizers: OrganizerDto[] = organizers.map((organizer) => this.parse(organizer, language));

    return this.collect(parsedOrganizers);
  }

  async findById(id: number, language?: LanguageEnum) {
    const organizer = await this.organizerRepository.findOne({ where: { id } });
    if (!organizer) return null;

    const parsedOrganizer: OrganizerDto = this.parse(organizer, language);

    return parsedOrganizer;
  }

  async findWithCount({ page, limit }: IPagination) {
    const [organizers, total] = await this.organizerRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit || 0,
      relations: { organizerRole: true },
    });

    return {
      data: organizers,
      total,
    };
  }

  async findWithContents(id: number) {
    const organizer = await this.organizerRepository.findOne({ where: { id }, relations: { organizerRole: true } });
    if (!organizer) return null;

    return organizer;
  }

  // CREATE
  async create({ organizerRoleId, ...dto }: CreateOrganizerDto) {
    return this.organizerRepository.save(this.organizerRepository.create({ organizerRole: { id: organizerRoleId }, ...dto }));
  }

  // UPDATE
  async update({ organizerRoleId, ...dto }: UpdateOrganizerDto, id: number) {
    return this.organizerRepository.save({ organizerRole: { id: organizerRoleId }, ...dto, id });
  }

  // DELETE
  async delete(id: number) {
    return this.organizerRepository.delete(id);
  }

  // PARSERS
  parse(organizer: OrganizerEntity, language: LanguageEnum) {
    const newOrganizer: OrganizerDto = plainToClass(OrganizerDto, organizer, { excludeExtraneousValues: true });

    newOrganizer.name = organizer[`name${capitalize(language)}`];
    newOrganizer.specialty = organizer[`specialty${capitalize(language)}`];
    newOrganizer.country = organizer[`country${capitalize(language)}`];
    newOrganizer.city = organizer[`city${capitalize(language)}`];
    newOrganizer.role = organizer[`role${capitalize(language)}`];

    if (organizer.organizerRole) newOrganizer.organizerRole = organizer.organizerRole[`title${capitalize(language)}`];

    return newOrganizer;
  }

  collect(organizers: OrganizerDto[]) {
    const roles = [...new Set(organizers.map((organizer) => organizer.organizerRole))];

    return roles.map((role) => {
      return {
        title: role,
        organizers: organizers.filter((organizer) => organizer.organizerRole === role),
      };
    });
  }
}
