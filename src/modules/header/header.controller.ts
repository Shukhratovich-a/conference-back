import { Controller, Get, Put, Body, Query } from "@nestjs/common";

import { LanguageEnum } from "@/enums/language.enum";

import { EnumValidationPipe } from "@/pipes/enum-validation.pipe";

import { HeaderService } from "./header.service";

import { UpdateHeaderDto } from "./dtos/update-header.dto";

@Controller("header")
export class HeaderController {
  constructor(private readonly headerService: HeaderService) {}

  // GET
  @Get("get")
  async get(@Query("language", new EnumValidationPipe(LanguageEnum, { defaultValue: LanguageEnum.RU })) language: LanguageEnum) {
    return this.headerService.find(language);
  }

  @Get("get-with-contents")
  async getWithContents() {
    return this.headerService.findWithContents();
  }

  // PUT
  // @UseGuards(JwtGuard)
  @Put("update")
  async update(@Body() dto: UpdateHeaderDto) {
    return this.headerService.update(dto);
  }
}
