import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";

import { LanguageEnum } from "@/enums/language.enum";

import { capitalize } from "@/utils/capitalize.utils";

import { ProgramEntity } from "./program.entity";

import { ProgramDto } from "./dtos/program.dto";
import { UpdateProgramDto } from "./dtos/update-program.dto";

@Injectable()
export class ProgramService {
  constructor(@InjectRepository(ProgramEntity) private readonly programRepository: Repository<ProgramEntity>) {}

  // FIND
  async find(language?: LanguageEnum) {
    let program = await this.programRepository.findOne({ where: { id: 1 } });
    if (!program) program = await this.programRepository.save({ id: 1 });

    const parsedProgram: ProgramDto = this.parse(program, language);

    return parsedProgram;
  }

  async findWithContents() {
    const program = await this.programRepository.findOne({ where: { id: 1 } });
    if (!program) return this.programRepository.save({ id: 1 });

    return program;
  }

  // UPDATE
  async update({ ...dto }: UpdateProgramDto) {
    return this.programRepository.save({ ...dto, id: 1 });
  }

  // PARSERS
  parse(program: ProgramEntity, language: LanguageEnum) {
    const newProgram: ProgramDto = plainToClass(ProgramDto, program, { excludeExtraneousValues: true });

    newProgram.body = program[`body${capitalize(language)}`];

    return newProgram;
  }
}
