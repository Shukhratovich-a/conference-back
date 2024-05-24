import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";

import { LanguageEnum } from "@/enums/language.enum";

import { capitalize } from "@/utils/capitalize.utils";

import { SubmissionEntity } from "./submission.entity";

import { SubmissionDto } from "./dtos/submission.dto";
import { UpdateSubmissionDto } from "./dtos/update-submission.dto";

@Injectable()
export class SubmissionService {
  constructor(@InjectRepository(SubmissionEntity) private readonly submissionRepository: Repository<SubmissionEntity>) {}

  // FIND
  async find(language?: LanguageEnum) {
    let submission = await this.submissionRepository.findOne({ where: { id: 1 } });
    if (!submission) submission = await this.submissionRepository.save({ id: 1 });

    const parsedSubmission: SubmissionDto = this.parse(submission, language);

    return parsedSubmission;
  }

  async findWithContents() {
    const submission = await this.submissionRepository.findOne({ where: { id: 1 } });
    if (!submission) return this.submissionRepository.save({ id: 1 });

    return submission;
  }

  // UPDATE
  async update({ ...dto }: UpdateSubmissionDto) {
    return this.submissionRepository.save({ ...dto, id: 1 });
  }

  // PARSERS
  parse(submission: SubmissionEntity, language: LanguageEnum) {
    const newSubmission: SubmissionDto = plainToClass(SubmissionDto, submission, { excludeExtraneousValues: true });

    newSubmission.body = submission[`body${capitalize(language)}`];

    return newSubmission;
  }
}
