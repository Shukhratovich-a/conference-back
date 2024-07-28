import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";

import { Repository } from "typeorm";
import { genSalt, hash, compare } from "bcryptjs";

import { ISort } from "@/interfaces/sort.interface";
import { IPagination } from "@/interfaces/pagination.interface";

import { UserEntity } from "./user.entity";

import { GetAllDto } from "./dtos/get-user.dto";
import { LoginDto } from "./dtos/login-user.dto";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  // FIND
  async findAll({ limit = 2, page = 1, ...options }: GetAllDto) {
    const [data, total] = await this.userRepository.findAndCount({
      where: { ...options },
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      data,
      total,
    };
  }

  async findById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByToken(token: string) {
    try {
      const { email } = await this.jwtService.verifyAsync(token);

      return this.findByEmail(email);
    } catch {
      throw new UnauthorizedException();
    }
  }

  async findWithCount({ sort = "createAt", order = "asc" }: ISort<keyof UserEntity>, { page = 1, limit = 0 }: IPagination) {
    const currentOrder = { [sort]: order } as unknown;

    const [users, total] = await this.userRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      order: currentOrder,
    });
    if (!users) return [];

    return {
      data: users.map((user) => {
        user.image = process.env.HOST + user.image;
        return user;
      }),
      total,
    };
  }

  async findWithContents(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return null;

    user.image = user.image ? process.env.HOST + user.image : null;

    return user;
  }

  // CREATE
  async create(dto: CreateUserDto) {
    const salt = await genSalt(10);
    const user = await this.userRepository.create({ ...dto, password: await hash(dto.password, salt) }).save();

    delete user.password;

    return user;
  }

  // UPDATE
  async update(dto: UpdateUserDto, id: number) {
    return this.userRepository.save({ ...dto, id });
  }

  // DELETE
  async delete(id: number) {
    return this.userRepository.delete(id);
  }

  async validateUser({ email, password }: LoginDto): Promise<Pick<UserEntity, "email" | "id">> {
    const user = await this.userRepository.findOne({ where: { email }, select: { id: true, email: true, password: true } });
    if (!user) throw new UnauthorizedException();

    const isCorrectPassword = await compare(password, user.password);
    if (!isCorrectPassword) throw new UnauthorizedException();

    return { email: user.email, id: user.id };
  }

  async login(email: string, id: number) {
    return { accessToken: await this.jwtService.signAsync({ email }), id };
  }
}
