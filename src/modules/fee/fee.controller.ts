import { Controller, Get, Put, Body, Query, UseGuards } from "@nestjs/common";

import { LanguageEnum } from "@/enums/language.enum";

import { EnumValidationPipe } from "@/pipes/enum-validation.pipe";

import { AdminJwtGuard } from "@/guards/admin-jwt.guard";

import { FeeService } from "./fee.service";

import { UpdateFeeDto } from "./dtos/update-fee.dto";

@Controller("fee")
export class FeeController {
  constructor(private readonly feeService: FeeService) {}

  // GET
  @Get("get")
  async get(@Query("language", new EnumValidationPipe(LanguageEnum, { defaultValue: LanguageEnum.RU })) language: LanguageEnum) {
    return this.feeService.find(language);
  }

  @Get("get-with-contents")
  @UseGuards(AdminJwtGuard)
  async getWithContents() {
    return this.feeService.findWithContents();
  }

  // PUT
  @Put("update")
  @UseGuards(AdminJwtGuard)
  async update(@Body() dto: UpdateFeeDto) {
    return this.feeService.update(dto);
  }
}
