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

import { CommitteeService } from "./committee.service";

import { CreateCommitteeDto } from "./dtos/create-committee.dto";
import { UpdateCommitteeDto } from "./dtos/update-committee.dto";

@Controller("committee")
export class CommitteeController {
  constructor(private readonly committeeService: CommitteeService) {}

  // GET
  @Get("get-all")
  async getAll(
    @Query("language", new EnumValidationPipe(LanguageEnum, { defaultValue: LanguageEnum.RU })) language: LanguageEnum,
  ) {
    return this.committeeService.findAll(language);
  }

  @Get("get-with-count")
  @UseGuards(AdminJwtGuard)
  async getWithCount(@Query() { page, limit }: IPagination) {
    return this.committeeService.findWithCount({ page, limit });
  }

  @Get("get-with-contents/:id")
  @UseGuards(AdminJwtGuard)
  async getWithContents(@Param("id", new ParseIntPipe()) id: number) {
    return this.committeeService.findWithContents(id);
  }

  // POST
  @Post("create")
  @UseGuards(AdminJwtGuard)
  async create(@Body() dto: CreateCommitteeDto) {
    return this.committeeService.create(dto);
  }

  // PUT
  @Put("update/:id")
  @UseGuards(AdminJwtGuard)
  async update(@Param("id", new ParseIntPipe()) id: number, @Body() dto: UpdateCommitteeDto) {
    const committee = await this.committeeService.findById(id);
    if (!committee) throw new BadRequestException("not found");

    return this.committeeService.update(dto, id);
  }

  // DELETE
  @Delete("delete/:id")
  @UseGuards(AdminJwtGuard)
  async delete(@Param("id", new ParseIntPipe()) id: number) {
    const committee = await this.committeeService.findById(id);
    if (!committee) throw new BadRequestException("not found");

    return this.committeeService.delete(id);
  }
}
