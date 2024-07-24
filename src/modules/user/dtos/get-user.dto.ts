import { IsEmail, IsEnum, IsNumberString, IsOptional } from "class-validator";

import { RoleEnum } from "@enums/role.enum";

export class GetAllDto {
  @IsEnum(RoleEnum)
  @IsOptional()
  role: RoleEnum;

  @IsNumberString()
  @IsOptional()
  limit: number;

  @IsNumberString()
  @IsOptional()
  page: number;
}

export class GetByEmailDto {
  @IsEmail()
  email: string;
}
