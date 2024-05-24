import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";

import { LanguageEnum } from "@/enums/language.enum";

import { capitalize } from "@/utils/capitalize.utils";

import { FeeEntity } from "./fee.entity";

import { FeeDto } from "./dtos/fee.dto";
import { UpdateFeeDto } from "./dtos/update-fee.dto";

@Injectable()
export class FeeService {
  constructor(@InjectRepository(FeeEntity) private readonly feeRepository: Repository<FeeEntity>) {}

  // FIND
  async find(language?: LanguageEnum) {
    let fee = await this.feeRepository.findOne({ where: { id: 1 } });
    if (!fee) fee = await this.feeRepository.save({ id: 1 });

    const parsedFee: FeeDto = this.parse(fee, language);

    return parsedFee;
  }

  async findWithContents() {
    const fee = await this.feeRepository.findOne({ where: { id: 1 } });
    if (!fee) return this.feeRepository.save({ id: 1 });

    return fee;
  }

  // UPDATE
  async update({ ...dto }: UpdateFeeDto) {
    return this.feeRepository.save({ ...dto, id: 1 });
  }

  // PARSERS
  parse(fee: FeeEntity, language: LanguageEnum) {
    const newFee: FeeDto = plainToClass(FeeDto, fee, { excludeExtraneousValues: true });

    newFee.body = fee[`body${capitalize(language)}`];

    return newFee;
  }
}
