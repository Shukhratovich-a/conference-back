import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";

import { LanguageEnum } from "@/enums/language.enum";

import { capitalize } from "@/utils/capitalize.utils";

import { ContactEntity } from "./contact.entity";

import { ContactDto } from "./dtos/contact.dto";
import { UpdateContactDto } from "./dtos/update-contact.dto";

@Injectable()
export class ContactService {
  constructor(@InjectRepository(ContactEntity) private readonly contactRepository: Repository<ContactEntity>) {}

  // FIND
  async find(language?: LanguageEnum) {
    let contact = await this.contactRepository.findOne({ where: { id: 1 } });
    if (!contact) contact = await this.contactRepository.save({ id: 1 });

    const parsedContact: ContactDto = this.parse(contact, language);

    return parsedContact;
  }

  async findWithContents() {
    const contact = await this.contactRepository.findOne({ where: { id: 1 } });
    if (!contact) return this.contactRepository.save({ id: 1 });

    return contact;
  }

  // UPDATE
  async update({ ...dto }: UpdateContactDto) {
    return this.contactRepository.save({ ...dto, id: 1 });
  }

  // PARSERS
  parse(contact: ContactEntity, language: LanguageEnum) {
    const newContact: ContactDto = plainToClass(ContactDto, contact, { excludeExtraneousValues: true });

    newContact.body = contact[`body${capitalize(language)}`];

    return newContact;
  }
}
