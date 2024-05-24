import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
  Param,
  ParseIntPipe,
  BadRequestException,
  UseGuards,
} from "@nestjs/common";

import { IPagination } from "@/interfaces/pagination.interface";
import { LanguageEnum } from "@/enums/language.enum";

import { EnumValidationPipe } from "@/pipes/enum-validation.pipe";

import { AdminJwtGuard } from "@/guards/admin-jwt.guard";

import { SponsorService } from "./sponsor.service";

import { CreateSponsorDto } from "./dtos/create-sponsor.dto";
import { UpdateSponsorDto } from "./dtos/update-sponsor.dto";

@Controller("sponsor")
export class SponsorController {
  constructor(private readonly sponsorService: SponsorService) {}

  // GET
  @Get("get-all")
  async getAll(
    @Query("language", new EnumValidationPipe(LanguageEnum, { defaultValue: LanguageEnum.RU })) language: LanguageEnum,
  ) {
    return this.sponsorService.findAll(language);
  }

  @Get("get-with-count")
  @UseGuards(AdminJwtGuard)
  async getWithCount(@Query() { page, limit }: IPagination) {
    return this.sponsorService.findWithCount({ page, limit });
  }

  @Get("get-with-contents/:id")
  @UseGuards(AdminJwtGuard)
  async getWithContents(@Param("id", new ParseIntPipe()) id: number) {
    return this.sponsorService.findWithContents(id);
  }

  // POST
  @Post("create")
  @UseGuards(AdminJwtGuard)
  async create(@Body() dto: CreateSponsorDto) {
    return this.sponsorService.create(dto);
  }

  // PUT
  @Put("update/:id")
  @UseGuards(AdminJwtGuard)
  async update(@Param("id", new ParseIntPipe()) id: number, @Body() dto: UpdateSponsorDto) {
    const sponsor = await this.sponsorService.findById(id);
    if (!sponsor) throw new BadRequestException("not found");

    return this.sponsorService.update(dto, id);
  }

  // DELETE
  @Delete("delete/:id")
  @UseGuards(AdminJwtGuard)
  async delete(@Param("id", new ParseIntPipe()) id: number) {
    const sponsor = await this.sponsorService.findById(id);
    if (!sponsor) throw new BadRequestException("not found");

    return this.sponsorService.delete(id);
  }
}
