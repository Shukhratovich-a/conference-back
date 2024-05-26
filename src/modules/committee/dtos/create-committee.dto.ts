import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCommitteeDto {
  @IsString()
  nameEn: string;

  @IsString()
  nameRu: string;

  @IsString()
  nameUz: string;

  @IsString()
  specialtyEn: string;

  @IsString()
  specialtyRu: string;

  @IsString()
  specialtyUz: string;

  @IsString()
  countryEn: string;

  @IsString()
  countryRu: string;

  @IsString()
  countryUz: string;

  @IsString()
  @IsOptional()
  cityEn: string;

  @IsString()
  @IsOptional()
  cityRu: string;

  @IsString()
  @IsOptional()
  cityUz: string;

  @IsString()
  @IsOptional()
  roleEn: string;

  @IsString()
  @IsOptional()
  roleRu: string;

  @IsString()
  @IsOptional()
  roleUz: string;

  @IsNumber()
  committeeRoleId: number;
}
