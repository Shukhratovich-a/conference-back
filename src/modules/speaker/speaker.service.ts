import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";

import { LanguageEnum } from "@/enums/language.enum";
import { IPagination } from "@/interfaces/pagination.interface";

import { capitalize } from "@/utils/capitalize.utils";

import { SpeakerEntity } from "./speaker.entity";

import { SpeakerDto } from "./dtos/speaker.dto";
import { CreateSpeakerDto } from "./dtos/create-speaker.dto";
import { UpdateSpeakerDto } from "./dtos/update-speaker.dto";

@Injectable()
export class SpeakerService {
  constructor(@InjectRepository(SpeakerEntity) private readonly speakerRepository: Repository<SpeakerEntity>) {}

  // FIND
  async findAll(language?: LanguageEnum) {
    const speakers = await this.speakerRepository.find();
    if (!speakers) return [];

    const parsedSpeakers: SpeakerDto[] = speakers.map((speaker) => this.parse(speaker, language));

    return parsedSpeakers;
  }

  async findById(id: number, language?: LanguageEnum) {
    const speaker = await this.speakerRepository.findOne({ where: { id } });
    if (!speaker) return null;

    const parsedSpeaker: SpeakerDto = this.parse(speaker, language);

    return parsedSpeaker;
  }

  async findWithCount({ page, limit }: IPagination) {
    const [speakers, total] = await this.speakerRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit || 0,
    });

    return {
      data: speakers.map((speaker) => {
        speaker.image = speaker.image ? process.env.HOST + speaker.image : null;
        return speaker;
      }),
      total,
    };
  }

  async findWithContents(id: number) {
    const speaker = await this.speakerRepository.findOne({ where: { id } });
    if (!speaker) return null;

    speaker.image = speaker.image ? process.env.HOST + speaker.image : null;

    return speaker;
  }

  // CREATE
  async create({ ...dto }: CreateSpeakerDto) {
    return this.speakerRepository.save(this.speakerRepository.create({ ...dto }));
  }

  // UPDATE
  async update({ ...dto }: UpdateSpeakerDto, id: number) {
    return this.speakerRepository.save({ ...dto, id });
  }

  // DELETE
  async delete(id: number) {
    return this.speakerRepository.delete(id);
  }

  // PARSERS
  parse(speaker: SpeakerEntity, language: LanguageEnum) {
    const newSpeaker: SpeakerDto = plainToClass(SpeakerDto, speaker, { excludeExtraneousValues: true });

    newSpeaker.degree = speaker[`degree${capitalize(language)}`];
    newSpeaker.specialty = speaker[`specialty${capitalize(language)}`];
    newSpeaker.description = speaker[`description${capitalize(language)}`];

    return newSpeaker;
  }
}
