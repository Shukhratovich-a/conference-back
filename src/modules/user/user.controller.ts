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

import { UserOrAdminJwtGuard } from "@guards/user-admin-jwt.guard";

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

  @UseGuards(UserOrAdminJwtGuard)
  @Get("get-by-id/:id")
  async getById(@Param("id", new ParseIntPipe()) id: number) {
    return this.userService.findById(id);
  }

  @UseGuards(UserOrAdminJwtGuard)
  @Get("get-by-email/:email")
  async getByEmail(@Param() { email }: GetByEmailDto) {
    return this.userService.findByEmail(email);
  }

  @UseGuards(UserOrAdminJwtGuard)
  @Get("get-by-token/:token")
  async getByToken(@Param("token") token: string) {
    return this.userService.findByToken(token);
  }

  // POST
  @Post("register")
  async register(@Body() dto: CreateUserDto) {
    const oldUser = await this.userService.findByEmail(dto.email);
    if (oldUser) throw new UnauthorizedException();

    return this.userService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(@Body() dto: LoginDto) {
    const { email, id } = await this.userService.validateUser(dto);

    return this.userService.login(email, id);
  }

  // PUT
  @UseGuards(UserOrAdminJwtGuard)
  @Put("update/:id")
  async update(@Param("id", new ParseIntPipe()) id: number, @Body() userDto: UpdateUserDto) {
    const user = await this.userService.findById(id);
    if (!user) throw new BadRequestException("not found");

    return this.userService.update(userDto, id);
  }

  // DELETE
  @UseGuards(UserOrAdminJwtGuard)
  @Delete("delete/:id")
  async delete(@Param("id", new ParseIntPipe()) id: number) {
    const user = await this.userService.findById(id);
    if (!user) throw new BadRequestException("not found");

    return this.userService.delete(id);
  }
}
