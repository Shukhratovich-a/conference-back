import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";

import { LanguageEnum } from "@/enums/language.enum";
import { IPagination } from "@/interfaces/pagination.interface";

import { capitalize } from "@/utils/capitalize.utils";

import { OrganizerRoleEntity } from "./organizer-role.entity";

import { OrganizerRoleDto } from "./dtos/organizer-role.dto";
import { CreateOrganizerRoleDto } from "./dtos/create-organizer-role.dto";
import { UpdateOrganizerRoleDto } from "./dtos/update-organizer-role.dto";

@Injectable()
export class OrganizerRoleService {
  constructor(@InjectRepository(OrganizerRoleEntity) private readonly organizerRoleRepository: Repository<OrganizerRoleEntity>) {}

  // FIND
  async findAll(language?: LanguageEnum) {
    const organizerRoles = await this.organizerRoleRepository.find();
    if (!organizerRoles) return [];

    const parsedOrganizerRoles: OrganizerRoleDto[] = organizerRoles.map((organizerRole) => this.parse(organizerRole, language));

    return parsedOrganizerRoles;
  }

  async findById(id: number, language?: LanguageEnum) {
    const organizerRole = await this.organizerRoleRepository.findOne({ where: { id } });
    if (!organizerRole) return null;

    const parsedOrganizerRole: OrganizerRoleDto = this.parse(organizerRole, language);

    return parsedOrganizerRole;
  }

  async findWithCount({ page, limit }: IPagination) {
    const [organizerRoles, total] = await this.organizerRoleRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit || 0,
    });

    return {
      data: organizerRoles,
      total,
    };
  }

  async findWithContents(id: number) {
    const organizerRole = await this.organizerRoleRepository.findOne({ where: { id } });
    if (!organizerRole) return null;

    return organizerRole;
  }

  // CREATE
  async create({ ...dto }: CreateOrganizerRoleDto) {
    return this.organizerRoleRepository.save(this.organizerRoleRepository.create({ ...dto }));
  }

  // UPDATE
  async update({ ...dto }: UpdateOrganizerRoleDto, id: number) {
    return this.organizerRoleRepository.save({ ...dto, id });
  }

  // DELETE
  async delete(id: number) {
    return this.organizerRoleRepository.delete(id);
  }

  // PARSERS
  parse(organizerRole: OrganizerRoleEntity, language: LanguageEnum) {
    const newOrganizerRole: OrganizerRoleDto = plainToClass(OrganizerRoleDto, organizerRole, { excludeExtraneousValues: true });

    newOrganizerRole.title = organizerRole[`title${capitalize(language)}`];

    return newOrganizerRole;
  }
}
