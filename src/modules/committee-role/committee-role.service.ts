import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";

import { LanguageEnum } from "@/enums/language.enum";
import { IPagination } from "@/interfaces/pagination.interface";

import { capitalize } from "@/utils/capitalize.utils";

import { CommitteeRoleEntity } from "./committee-role.entity";

import { CommitteeRoleDto } from "./dtos/committee-role.dto";
import { CreateCommitteeRoleDto } from "./dtos/create-committee-role.dto";
import { UpdateCommitteeRoleDto } from "./dtos/update-committee-role.dto";

@Injectable()
export class CommitteeRoleService {
  constructor(@InjectRepository(CommitteeRoleEntity) private readonly committeeRoleRepository: Repository<CommitteeRoleEntity>) {}

  // FIND
  async findAll(language?: LanguageEnum) {
    const committeeRoles = await this.committeeRoleRepository.find();
    if (!committeeRoles) return [];

    const parsedCommitteeRoles: CommitteeRoleDto[] = committeeRoles.map((committeeRole) => this.parse(committeeRole, language));

    return parsedCommitteeRoles;
  }

  async findById(id: number, language?: LanguageEnum) {
    const committeeRole = await this.committeeRoleRepository.findOne({ where: { id } });
    if (!committeeRole) return null;

    const parsedCommitteeRole: CommitteeRoleDto = this.parse(committeeRole, language);

    return parsedCommitteeRole;
  }

  async findWithCount({ page, limit }: IPagination) {
    const [committeeRoles, total] = await this.committeeRoleRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit || 0,
    });

    return {
      data: committeeRoles,
      total,
    };
  }

  async findWithContents(id: number) {
    const committeeRole = await this.committeeRoleRepository.findOne({ where: { id } });
    if (!committeeRole) return null;

    return committeeRole;
  }

  // CREATE
  async create({ ...dto }: CreateCommitteeRoleDto) {
    return this.committeeRoleRepository.save(this.committeeRoleRepository.create({ ...dto }));
  }

  // UPDATE
  async update({ ...dto }: UpdateCommitteeRoleDto, id: number) {
    return this.committeeRoleRepository.save({ ...dto, id });
  }

  // DELETE
  async delete(id: number) {
    return this.committeeRoleRepository.delete(id);
  }

  // PARSERS
  parse(committeeRole: CommitteeRoleEntity, language: LanguageEnum) {
    const newCommitteeRole: CommitteeRoleDto = plainToClass(CommitteeRoleDto, committeeRole, { excludeExtraneousValues: true });

    newCommitteeRole.title = committeeRole[`title${capitalize(language)}`];

    return newCommitteeRole;
  }
}
