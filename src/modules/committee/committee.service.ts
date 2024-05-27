import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";

import { LanguageEnum } from "@/enums/language.enum";
import { IPagination } from "@/interfaces/pagination.interface";

import { capitalize } from "@/utils/capitalize.utils";

import { CommitteeEntity } from "./committee.entity";

import { CommitteeDto } from "./dtos/committee.dto";
import { CreateCommitteeDto } from "./dtos/create-committee.dto";
import { UpdateCommitteeDto } from "./dtos/update-committee.dto";

@Injectable()
export class CommitteeService {
  constructor(@InjectRepository(CommitteeEntity) private readonly committeeRepository: Repository<CommitteeEntity>) {}

  // FIND
  async findAll(language?: LanguageEnum) {
    const committees = await this.committeeRepository.find({ relations: { committeeRole: true } });
    if (!committees) return [];

    const parsedCommittees: CommitteeDto[] = committees.map((committee) => this.parse(committee, language));

    return this.collect(parsedCommittees);
  }

  async findById(id: number, language?: LanguageEnum) {
    const committee = await this.committeeRepository.findOne({ where: { id } });
    if (!committee) return null;

    const parsedCommittee: CommitteeDto = this.parse(committee, language);

    return parsedCommittee;
  }

  async findWithCount({ page, limit }: IPagination) {
    const [committees, total] = await this.committeeRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit || 0,
      relations: { committeeRole: true },
    });

    return {
      data: committees,
      total,
    };
  }

  async findWithContents(id: number) {
    const committee = await this.committeeRepository.findOne({ where: { id }, relations: { committeeRole: true } });
    if (!committee) return null;

    return committee;
  }

  // CREATE
  async create({ committeeRoleId, ...dto }: CreateCommitteeDto) {
    return this.committeeRepository.save(this.committeeRepository.create({ committeeRole: { id: committeeRoleId }, ...dto }));
  }

  // UPDATE
  async update({ committeeRoleId, ...dto }: UpdateCommitteeDto, id: number) {
    console.log(committeeRoleId);

    return this.committeeRepository.save({ committeeRole: { id: committeeRoleId }, ...dto, id });
  }

  // DELETE
  async delete(id: number) {
    return this.committeeRepository.delete(id);
  }

  // PARSERS
  parse(committee: CommitteeEntity, language: LanguageEnum) {
    const newCommittee: CommitteeDto = plainToClass(CommitteeDto, committee, { excludeExtraneousValues: true });

    newCommittee.name = committee[`name${capitalize(language)}`];
    newCommittee.specialty = committee[`specialty${capitalize(language)}`];
    newCommittee.country = committee[`country${capitalize(language)}`];
    newCommittee.city = committee[`city${capitalize(language)}`];
    newCommittee.role = committee[`role${capitalize(language)}`];

    if (committee.committeeRole) newCommittee.committeeRole = committee.committeeRole[`title${capitalize(language)}`];

    return newCommittee;
  }

  collect(committees: CommitteeDto[]) {
    const roles = [...new Set(committees.map((committee) => committee.committeeRole))];

    return roles.map((role) => {
      return {
        title: role,
        committees: committees.filter((committee) => committee.committeeRole === role),
      };
    });
  }
}
