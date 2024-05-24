import { Controller, Get, Put, Body, Query, UseGuards } from "@nestjs/common";

import { LanguageEnum } from "@/enums/language.enum";

import { EnumValidationPipe } from "@/pipes/enum-validation.pipe";

import { AdminJwtGuard } from "@/guards/admin-jwt.guard";

import { DateService } from "./date.service";

import { UpdateDateDto } from "./dtos/update-date.dto";

@Controller("date")
export class DateController {
  constructor(private readonly dateService: DateService) {}

  // GET
  @Get("get")
  async get(@Query("language", new EnumValidationPipe(LanguageEnum, { defaultValue: LanguageEnum.RU })) language: LanguageEnum) {
    return this.dateService.find(language);
  }

  @Get("get-with-contents")
  @UseGuards(AdminJwtGuard)
  async getWithContents() {
    return this.dateService.findWithContents();
  }

  // PUT
  @Put("update")
  @UseGuards(AdminJwtGuard)
  async update(@Body() dto: UpdateDateDto) {
    return this.dateService.update(dto);
  }
}
