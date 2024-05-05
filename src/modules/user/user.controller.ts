import {
  Controller,
  UseGuards,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";

import { ISort } from "@/interfaces/sort.interface";
import { IPagination } from "@/interfaces/pagination.interface";

import { UserOrAdminJwtGuard } from "@guards/user-admin-jwt.guard";
import { AdminJwtGuard } from "@/guards/admin-jwt.guard";

import { UserEntity } from "./user.entity";

import { UserService } from "./user.service";

import { GetAllDto, GetByEmailDto } from "./dtos/get-user.dto";
import { LoginDto } from "./dtos/login-user.dto";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET
  @Get("get-all")
  async getAll(@Query() options: GetAllDto) {
    return this.userService.findAll(options);
  }

  @Get("get-by-id/:id")
  @UseGuards(UserOrAdminJwtGuard)
  async getById(@Param("id", new ParseIntPipe()) id: number) {
    return this.userService.findById(id);
  }

  @Get("get-by-email/:email")
  @UseGuards(UserOrAdminJwtGuard)
  async getByEmail(@Param() { email }: GetByEmailDto) {
    return this.userService.findByEmail(email);
  }

  @Get("get-by-token/:token")
  @UseGuards(UserOrAdminJwtGuard)
  async getByToken(@Param("token") token: string) {
    return this.userService.findByToken(token);
  }

  @Get("get-with-count")
  @UseGuards(AdminJwtGuard)
  async getWithCount(@Query() sort: ISort<keyof UserEntity>, @Query() pagination: IPagination) {
    return this.userService.findWithCount(sort, pagination);
  }

  @Get("get-with-contents/:id")
  @UseGuards(AdminJwtGuard)
  async getWithContents(@Param("id", new ParseIntPipe()) id: number) {
    return this.userService.findWithContents(id);
  }

  // POST
  @Post("register")
  async register(@Body() dto: CreateUserDto) {
    const oldUser = await this.userService.findByEmail(dto.email);
    if (oldUser) throw new UnauthorizedException();

    return this.userService.create(dto);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    const { email, id } = await this.userService.validateUser(dto);

    return this.userService.login(email, id);
  }

  // PUT
  @Put("update/:id")
  @UseGuards(UserOrAdminJwtGuard)
  async update(@Param("id", new ParseIntPipe()) id: number, @Body() userDto: UpdateUserDto) {
    const user = await this.userService.findById(id);
    if (!user) throw new BadRequestException("not found");

    return this.userService.update(userDto, id);
  }

  // DELETE
  @Delete("delete/:id")
  @UseGuards(UserOrAdminJwtGuard)
  async delete(@Param("id", new ParseIntPipe()) id: number) {
    const user = await this.userService.findById(id);
    if (!user) throw new BadRequestException("not found");

    return this.userService.delete(id);
  }
}
