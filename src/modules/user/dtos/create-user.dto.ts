import { IsString, IsEnum, IsEmail, MinLength, IsOptional } from "class-validator";

import { GenderEnum } from "@enums/gender.enum";
import { RoleEnum } from "@enums/role.enum";

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @IsEnum(RoleEnum)
  @IsOptional()
  role: RoleEnum;

  @IsString()
  @IsOptional()
  institute: string;

  @IsString()
  @IsOptional()
  specialty: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  postalCode: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
