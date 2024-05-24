import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";

import { LanguageEnum } from "@/enums/language.enum";

import { capitalize } from "@/utils/capitalize.utils";

import { SocialProgramEntity } from "./social-program.entity";

import { SocialProgramDto } from "./dtos/social-program.dto";
import { UpdateSocialProgramDto } from "./dtos/update-social-program.dto";

@Injectable()
export class SocialProgramService {
  constructor(@InjectRepository(SocialProgramEntity) private readonly socialProgramRepository: Repository<SocialProgramEntity>) {}

  // FIND
  async find(language?: LanguageEnum) {
    let socialProgram = await this.socialProgramRepository.findOne({ where: { id: 1 } });
    if (!socialProgram) socialProgram = await this.socialProgramRepository.save({ id: 1 });

    const parsedSocialProgram: SocialProgramDto = this.parse(socialProgram, language);

    return parsedSocialProgram;
  }

  async findWithContents() {
    const socialProgram = await this.socialProgramRepository.findOne({ where: { id: 1 } });
    if (!socialProgram) return this.socialProgramRepository.save({ id: 1 });

    return socialProgram;
  }

  // UPDATE
  async update({ ...dto }: UpdateSocialProgramDto) {
    return this.socialProgramRepository.save({ ...dto, id: 1 });
  }

  // PARSERS
  parse(socialProgram: SocialProgramEntity, language: LanguageEnum) {
    const newSocialProgram: SocialProgramDto = plainToClass(SocialProgramDto, socialProgram, { excludeExtraneousValues: true });

    newSocialProgram.body = socialProgram[`body${capitalize(language)}`];

    return newSocialProgram;
  }
}
