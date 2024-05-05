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
  @Get("get-all")
  @UseGuards(AdminJwtGuard)
  async getAll() {
    return this.adminService.findAll();
  }

  @Get("get-by-id/:id")
  @UseGuards(AdminJwtGuard)
  async getById(@Param("id", new ParseIntPipe()) id: number) {
    return this.adminService.findById(id);
  }

  @Get("get-by-username/:username")
  @UseGuards(AdminJwtGuard)
  async getByUsername(@Param("username") username: string) {
    return this.adminService.findByUsername(username);
  }

  @Get("get-by-token/:token")
  @UseGuards(AdminJwtGuard)
  async getByToken(@Param("token") token: string) {
    return this.adminService.findByToken(token);
  }

  // POST
  @Post("register")
  // @UseGuards(AdminJwtGuard)
  async register(@Body() dto: CreateAdminDto) {
    const oldUser = await this.adminService.findByUsername(dto.username);
    if (oldUser) throw new BadRequestException();

    return this.adminService.create(dto);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginAdminDto) {
    const { username } = await this.adminService.validateAdmin(dto);

    return this.adminService.login(username);
  }

  // PUT
  @Put("update/:id")
  @UseGuards(AdminJwtGuard)
  async update(@Param("id", new ParseIntPipe()) id: number, @Body() dto: UpdateAdminDto) {
    const user = await this.adminService.findById(id);
    if (!user) throw new BadRequestException("not found");

    return this.adminService.update(dto, id);
  }

  // DELETE
  @Delete("delete/:id")
  @UseGuards(AdminJwtGuard)
  async delete(@Param("id", new ParseIntPipe()) id: number) {
    const user = await this.adminService.findById(id);
    if (!user) throw new BadRequestException("not found");

    return this.adminService.delete(id);
  }
}
