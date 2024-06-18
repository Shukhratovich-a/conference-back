import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";

import { LanguageEnum } from "@/enums/language.enum";

import { capitalize } from "@/utils/capitalize.utils";

import { VenueEntity } from "./venue.entity";

import { VenueDto } from "./dtos/venue.dto";
import { UpdateVenueDto } from "./dtos/update-venue.dto";

@Injectable()
export class VenueService {
  constructor(@InjectRepository(VenueEntity) private readonly venueRepository: Repository<VenueEntity>) {}

  // FIND
  async find(language?: LanguageEnum) {
    let venue = await this.venueRepository.findOne({ where: { id: 1 } });
    if (!venue) venue = await this.venueRepository.save({ id: 1 });

    const parsedVenue: VenueDto = this.parse(venue, language);

    return parsedVenue;
  }

  async findWithContents() {
    const venue = await this.venueRepository.findOne({ where: { id: 1 } });
    if (!venue) return this.venueRepository.save({ id: 1 });

    return venue;
  }

  // UPDATE
  async update({ ...dto }: UpdateVenueDto) {
    return this.venueRepository.save({ ...dto, id: 1 });
  }

  // PARSERS
  parse(venue: VenueEntity, language: LanguageEnum) {
    const newVenue: VenueDto = plainToClass(VenueDto, venue, { excludeExtraneousValues: true });

    newVenue.body = venue[`body${capitalize(language)}`];

    return newVenue;
  }
}
