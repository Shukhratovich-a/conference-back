import { Controller, Get, Put, Body, Query, UseGuards } from "@nestjs/common";

import { LanguageEnum } from "@/enums/language.enum";

import { EnumValidationPipe } from "@/pipes/enum-validation.pipe";

import { AdminJwtGuard } from "@/guards/admin-jwt.guard";

import { SubmissionService } from "./submission.service";

import { UpdateSubmissionDto } from "./dtos/update-submission.dto";

@Controller("submission")
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  // GET
  @Get("get")
  async get(@Query("language", new EnumValidationPipe(LanguageEnum, { defaultValue: LanguageEnum.RU })) language: LanguageEnum) {
    return this.submissionService.find(language);
  }

  @Get("get-with-contents")
  @UseGuards(AdminJwtGuard)
  async getWithContents() {
    return this.submissionService.findWithContents();
  }

  // PUT
  @Put("update")
  @UseGuards(AdminJwtGuard)
  async update(@Body() dto: UpdateSubmissionDto) {
    return this.submissionService.update(dto);
  }
}
