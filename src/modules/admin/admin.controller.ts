import {
  Controller,
  UseGuards,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  BadRequestException,
} from "@nestjs/common";

import { AdminJwtGuard } from "@guards/admin-jwt.guard";

import { AdminService } from "./admin.service";

import { LoginAdminDto } from "./dtos/login-admin.dto";
import { CreateAdminDto } from "./dtos/create-admin.dto";
import { UpdateAdminDto } from "./dtos/update-admin.dto";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // GET
  @UseGuards(AdminJwtGuard)
  @Get("get-all")
  async getAll() {
    return this.adminService.findAll();
  }

  @UseGuards(AdminJwtGuard)
  @Get("get-by-id/:id")
  async getById(@Param("id", new ParseIntPipe()) id: number) {
    return this.adminService.findById(id);
  }

  @UseGuards(AdminJwtGuard)
  @Get("get-by-username/:username")
  async getByUsername(@Param("username") username: string) {
    return this.adminService.findByUsername(username);
  }

  // POST
  @Post("register")
  async register(@Body() dto: CreateAdminDto) {
    const oldUser = await this.adminService.findByUsername(dto.username);
    if (oldUser) throw new BadRequestException();

    return this.adminService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(@Body() dto: LoginAdminDto) {
    const { username } = await this.adminService.validateAdmin(dto);

    return this.adminService.login(username);
  }

  // PUT
  @UseGuards(AdminJwtGuard)
  @Put("update/:id")
  async update(@Param("id", new ParseIntPipe()) id: number, @Body() dto: UpdateAdminDto) {
    const user = await this.adminService.findById(id);
    if (!user) throw new BadRequestException("not found");

    return this.adminService.update(dto, id);
  }

  // DELETE
  @UseGuards(AdminJwtGuard)
  @Delete("delete/:id")
  async delete(@Param("id", new ParseIntPipe()) id: number) {
    const user = await this.adminService.findById(id);
    if (!user) throw new BadRequestException("not found");

    return this.adminService.delete(id);
  }
}
