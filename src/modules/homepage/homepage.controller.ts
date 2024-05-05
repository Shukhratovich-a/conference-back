import { Controller, Get, Put, Body, Query, UseGuards } from "@nestjs/common";

import { LanguageEnum } from "@/enums/language.enum";

import { EnumValidationPipe } from "@/pipes/enum-validation.pipe";

import { HomepageService } from "./homepage.service";

import { UpdateHomepageDto } from "./dtos/update-homepage.dto";
import { AdminJwtGuard } from "@/guards/admin-jwt.guard";

@Controller("homepage")
export class HomepageController {
  constructor(private readonly homepageService: HomepageService) {}

  // GET
  @Get("get")
  async get(@Query("language", new EnumValidationPipe(LanguageEnum, { defaultValue: LanguageEnum.RU })) language: LanguageEnum) {
    return this.homepageService.find(language);
  }

  @Get("get-with-contents")
  @UseGuards(AdminJwtGuard)
  async getWithContents() {
    return this.homepageService.findWithContents();
  }

  // PUT
  @Put("update")
  @UseGuards(AdminJwtGuard)
  async update(@Body() dto: UpdateHomepageDto) {
    return this.homepageService.update(dto);
  }
}
