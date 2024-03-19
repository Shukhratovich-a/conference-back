import { IsEmail, IsEnum, IsOptional } from "class-validator";

import { RoleEnum } from "@enums/role.enum";

export class GetAllDto {
  @IsEnum(RoleEnum)
  @IsOptional()
  role: RoleEnum;
}

export class GetByEmailDto {
  @IsEmail()
  email: string;
}
