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

import { OrganizerRoleService } from "./organizer-role.service";

import { CreateOrganizerRoleDto } from "./dtos/create-organizer-role.dto";
import { UpdateOrganizerRoleDto } from "./dtos/update-organizer-role.dto";

@Controller("organizer-role")
export class OrganizerRoleController {
  constructor(private readonly organizerRoleService: OrganizerRoleService) {}

  // GET
  @Get("get-all")
  async getAll(
    @Query("language", new EnumValidationPipe(LanguageEnum, { defaultValue: LanguageEnum.RU })) language: LanguageEnum,
  ) {
    return this.organizerRoleService.findAll(language);
  }

  @Get("get-with-count")
  @UseGuards(AdminJwtGuard)
  async getWithCount(@Query() { page, limit }: IPagination) {
    return this.organizerRoleService.findWithCount({ page, limit });
  }

  @Get("get-with-contents/:id")
  @UseGuards(AdminJwtGuard)
  async getWithContents(@Param("id", new ParseIntPipe()) id: number) {
    return this.organizerRoleService.findWithContents(id);
  }

  // POST
  @Post("create")
  @UseGuards(AdminJwtGuard)
  async create(@Body() dto: CreateOrganizerRoleDto) {
    return this.organizerRoleService.create(dto);
  }

  // PUT
  @Put("update/:id")
  @UseGuards(AdminJwtGuard)
  async update(@Param("id", new ParseIntPipe()) id: number, @Body() dto: UpdateOrganizerRoleDto) {
    const organizerRole = await this.organizerRoleService.findById(id);
    if (!organizerRole) throw new BadRequestException("not found");

    return this.organizerRoleService.update(dto, id);
  }

  // DELETE
  @Delete("delete/:id")
  @UseGuards(AdminJwtGuard)
  async delete(@Param("id", new ParseIntPipe()) id: number) {
    const organizerRole = await this.organizerRoleService.findById(id);
    if (!organizerRole) throw new BadRequestException("not found");

    return this.organizerRoleService.delete(id);
  }
}
