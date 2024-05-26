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

import { CommitteeRoleService } from "./committee-role.service";

import { CreateCommitteeRoleDto } from "./dtos/create-committee-role.dto";
import { UpdateCommitteeRoleDto } from "./dtos/update-committee-role.dto";

@Controller("committee-role")
export class CommitteeRoleController {
  constructor(private readonly committeeRoleService: CommitteeRoleService) {}

  // GET
  @Get("get-all")
  async getAll(
    @Query("language", new EnumValidationPipe(LanguageEnum, { defaultValue: LanguageEnum.RU })) language: LanguageEnum,
  ) {
    return this.committeeRoleService.findAll(language);
  }

  @Get("get-with-count")
  @UseGuards(AdminJwtGuard)
  async getWithCount(@Query() { page, limit }: IPagination) {
    return this.committeeRoleService.findWithCount({ page, limit });
  }

  @Get("get-with-contents/:id")
  @UseGuards(AdminJwtGuard)
  async getWithContents(@Param("id", new ParseIntPipe()) id: number) {
    return this.committeeRoleService.findWithContents(id);
  }

  // POST
  @Post("create")
  @UseGuards(AdminJwtGuard)
  async create(@Body() dto: CreateCommitteeRoleDto) {
    return this.committeeRoleService.create(dto);
  }

  // PUT
  @Put("update/:id")
  @UseGuards(AdminJwtGuard)
  async update(@Param("id", new ParseIntPipe()) id: number, @Body() dto: UpdateCommitteeRoleDto) {
    const committeeRole = await this.committeeRoleService.findById(id);
    if (!committeeRole) throw new BadRequestException("not found");

    return this.committeeRoleService.update(dto, id);
  }

  // DELETE
  @Delete("delete/:id")
  @UseGuards(AdminJwtGuard)
  async delete(@Param("id", new ParseIntPipe()) id: number) {
    const committeeRole = await this.committeeRoleService.findById(id);
    if (!committeeRole) throw new BadRequestException("not found");

    return this.committeeRoleService.delete(id);
  }
}
