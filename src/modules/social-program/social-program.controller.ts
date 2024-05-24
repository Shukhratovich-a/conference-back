import { Controller, Get, Put, Body, Query, UseGuards } from "@nestjs/common";

import { LanguageEnum } from "@/enums/language.enum";

import { EnumValidationPipe } from "@/pipes/enum-validation.pipe";

import { AdminJwtGuard } from "@/guards/admin-jwt.guard";

import { SocialProgramService } from "./social-program.service";

import { UpdateSocialProgramDto } from "./dtos/update-social-program.dto";

@Controller("social-program")
export class SocialProgramController {
  constructor(private readonly socialProgramService: SocialProgramService) {}

  // GET
  @Get("get")
  async get(@Query("language", new EnumValidationPipe(LanguageEnum, { defaultValue: LanguageEnum.RU })) language: LanguageEnum) {
    return this.socialProgramService.find(language);
  }

  @Get("get-with-contents")
  @UseGuards(AdminJwtGuard)
  async getWithContents() {
    return this.socialProgramService.findWithContents();
  }

  // PUT
  @Put("update")
  @UseGuards(AdminJwtGuard)
  async update(@Body() dto: UpdateSocialProgramDto) {
    return this.socialProgramService.update(dto);
  }
}
