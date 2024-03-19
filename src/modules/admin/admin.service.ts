import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";

import { Repository } from "typeorm";
import { genSalt, hash, compare } from "bcryptjs";

import { AdminEntity } from "./admin.entity";

import { CreateAdminDto } from "./dtos/create-admin.dto";
import { UpdateAdminDto } from "./dtos/update-admin.dto";
import { LoginAdminDto } from "./dtos/login-admin.dto";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity) private readonly adminRepository: Repository<AdminEntity>,
    private readonly jwtService: JwtService,
  ) {}

  // FIND
  async findAll() {
    return this.adminRepository.findAndCount();
  }

  async findById(id: number) {
    return this.adminRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string) {
    return this.adminRepository.findOne({ where: { username } });
  }

  // CREATE
  async create(dto: CreateAdminDto) {
    const salt = await genSalt(10);
    const admin = this.adminRepository.create({ ...dto, password: await hash(dto.password, salt) });

    return admin.save();
  }

  // UPDATE
  async update(dto: UpdateAdminDto, id: number) {
    return this.adminRepository.save({ ...dto, id });
  }

  // DELETE
  async delete(id: number) {
    return this.adminRepository.delete(id);
  }

  async validateAdmin({ username, password }: LoginAdminDto): Promise<Pick<AdminEntity, "username">> {
    const admin = await this.adminRepository.findOne({ where: { username }, select: { username: true, password: true } });
    if (!admin) throw new UnauthorizedException();

    const isCorrectPassword = await compare(password, admin.password);
    if (!isCorrectPassword) throw new UnauthorizedException();

    return { username: admin.username };
  }

  async login(username: string) {
    return { accessToken: await this.jwtService.signAsync({ username }) };
  }
}
