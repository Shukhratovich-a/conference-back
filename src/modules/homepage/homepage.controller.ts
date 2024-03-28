import { Controller, Get, Put, Body, Query } from "@nestjs/common";

import { LanguageEnum } from "@/enums/language.enum";

import { EnumValidationPipe } from "@/pipes/enum-validation.pipe";

import { HomepageService } from "./homepage.service";

import { UpdateHomepageDto } from "./dtos/update-homepage.dto";

@Controller("homepage")
export class HomepageController {
  constructor(private readonly homepageService: HomepageService) {}

  // GET
  @Get("get")
  async get(@Query("language", new EnumValidationPipe(LanguageEnum, { defaultValue: LanguageEnum.RU })) language: LanguageEnum) {
    return this.homepageService.find(language);
  }

  @Get("get-with-contents")
  async getWithContents() {
    return this.homepageService.findWithContents();
  }

  // PUT
  // @UseGuards(JwtGuard)
  @Put("update")
  async update(@Body() dto: UpdateHomepageDto) {
    return this.homepageService.update(dto);
  }
}
