import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";

import { LanguageEnum } from "@/enums/language.enum";
import { IPagination } from "@/interfaces/pagination.interface";

import { capitalize } from "@/utils/capitalize.utils";

import { SponsorEntity } from "./sponsor.entity";

import { SponsorDto } from "./dtos/sponsor.dto";
import { CreateSponsorDto } from "./dtos/create-sponsor.dto";
import { UpdateSponsorDto } from "./dtos/update-sponsor.dto";

@Injectable()
export class SponsorService {
  constructor(@InjectRepository(SponsorEntity) private readonly sponsorRepository: Repository<SponsorEntity>) {}

  // FIND
  async findAll(language?: LanguageEnum) {
    const sponsors = await this.sponsorRepository.find();
    if (!sponsors) return [];

    const parsedSponsors: SponsorDto[] = sponsors.map((sponsor) => this.parse(sponsor, language));

    return parsedSponsors;
  }

  async findById(id: number, language?: LanguageEnum) {
    const sponsor = await this.sponsorRepository.findOne({ where: { id } });
    if (!sponsor) return null;

    const parsedSponsor: SponsorDto = this.parse(sponsor, language);

    return parsedSponsor;
  }

  async findWithCount({ page, limit }: IPagination) {
    const [sponsors, total] = await this.sponsorRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit || 0,
    });

    return {
      data: sponsors.map((sponsor) => {
        sponsor.image = sponsor.image ? process.env.HOST + sponsor.image : null;
        return sponsor;
      }),
      total,
    };
  }

  async findWithContents(id: number) {
    const sponsor = await this.sponsorRepository.findOne({ where: { id } });
    if (!sponsor) return null;

    sponsor.image = sponsor.image ? process.env.HOST + sponsor.image : null;

    return sponsor;
  }

  // CREATE
  async create({ ...dto }: CreateSponsorDto) {
    return this.sponsorRepository.save(this.sponsorRepository.create({ ...dto }));
  }

  // UPDATE
  async update({ ...dto }: UpdateSponsorDto, id: number) {
    return this.sponsorRepository.save({ ...dto, id });
  }

  // DELETE
  async delete(id: number) {
    return this.sponsorRepository.delete(id);
  }

  // PARSERS
  parse(sponsor: SponsorEntity, language: LanguageEnum) {
    const newSponsor: SponsorDto = plainToClass(SponsorDto, sponsor, { excludeExtraneousValues: true });

    newSponsor.title = sponsor[`title${capitalize(language)}`];

    return newSponsor;
  }
}
