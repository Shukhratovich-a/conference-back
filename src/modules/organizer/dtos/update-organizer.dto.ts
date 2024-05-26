import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateOrganizerDto {
  @IsString()
  @IsOptional()
  nameEn: string;

  @IsString()
  @IsOptional()
  nameRu: string;

  @IsString()
  @IsOptional()
  nameUz: string;

  @IsString()
  @IsOptional()
  specialtyEn: string;

  @IsString()
  @IsOptional()
  specialtyRu: string;

  @IsString()
  @IsOptional()
  specialtyUz: string;

  @IsString()
  @IsOptional()
  countryEn: string;

  @IsString()
  @IsOptional()
  countryRu: string;

  @IsString()
  @IsOptional()
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
  @IsOptional()
  organizerRoleId: number;
}
