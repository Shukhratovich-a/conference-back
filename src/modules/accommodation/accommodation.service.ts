import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";

import { LanguageEnum } from "@/enums/language.enum";

import { capitalize } from "@/utils/capitalize.utils";

import { AccommodationEntity } from "./accommodation.entity";

import { AccommodationDto } from "./dtos/accommodation.dto";
import { UpdateAccommodationDto } from "./dtos/update-accommodation.dto";

@Injectable()
export class AccommodationService {
  constructor(@InjectRepository(AccommodationEntity) private readonly accommodationRepository: Repository<AccommodationEntity>) {}

  // FIND
  async find(language?: LanguageEnum) {
    let accommodation = await this.accommodationRepository.findOne({ where: { id: 1 } });
    if (!accommodation) accommodation = await this.accommodationRepository.save({ id: 1 });

    const parsedAccommodation: AccommodationDto = this.parse(accommodation, language);

    return parsedAccommodation;
  }

  async findWithContents() {
    const accommodation = await this.accommodationRepository.findOne({ where: { id: 1 } });
    if (!accommodation) return this.accommodationRepository.save({ id: 1 });

    return accommodation;
  }

  // UPDATE
  async update({ ...dto }: UpdateAccommodationDto) {
    return this.accommodationRepository.save({ ...dto, id: 1 });
  }

  // PARSERS
  parse(accommodation: AccommodationEntity, language: LanguageEnum) {
    const newAccommodation: AccommodationDto = plainToClass(AccommodationDto, accommodation, {
      excludeExtraneousValues: true,
    });

    newAccommodation.body = accommodation[`body${capitalize(language)}`];

    return newAccommodation;
  }
}
