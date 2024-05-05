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

import { SectionService } from "./section.service";

import { CreateSectionDto } from "./dtos/create-section.dto";
import { UpdateSectionDto } from "./dtos/update-section.dto";
import { AdminJwtGuard } from "@/guards/admin-jwt.guard";

@Controller("section")
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  // GET
  @Get("get-all")
  async getAll(
    @Query("language", new EnumValidationPipe(LanguageEnum, { defaultValue: LanguageEnum.RU })) language: LanguageEnum,
  ) {
    return this.sectionService.findAll(language);
  }

  @Get("get-by-id/:id")
  async getById(@Param("id", new ParseIntPipe()) id: number) {
    return this.sectionService.findById(id);
  }

  @Get("get-with-count")
  @UseGuards(AdminJwtGuard)
  async getWithCount(@Query() { page, limit }: IPagination) {
    return this.sectionService.findWithCount({ page, limit });
  }

  @Get("get-with-contents/:id")
  @UseGuards(AdminJwtGuard)
  async getWithContents(@Param("id", new ParseIntPipe()) id: number) {
    return this.sectionService.findWithContents(id);
  }

  // POST
  @Post("create")
  @UseGuards(AdminJwtGuard)
  async create(@Body() dto: CreateSectionDto) {
    return this.sectionService.create(dto);
  }

  // PUT
  @Put("update/:id")
  @UseGuards(AdminJwtGuard)
  async update(@Param("id", new ParseIntPipe()) id: number, @Body() dto: UpdateSectionDto) {
    const section = await this.sectionService.findById(id);
    if (!section) throw new BadRequestException("not found");

    return this.sectionService.update(dto, id);
  }

  // DELETE
  @Delete("delete/:id")
  @UseGuards(AdminJwtGuard)
  async delete(@Param("id", new ParseIntPipe()) id: number) {
    const section = await this.sectionService.findById(id);
    if (!section) throw new BadRequestException("not found");

    return this.sectionService.delete(id);
  }
}
