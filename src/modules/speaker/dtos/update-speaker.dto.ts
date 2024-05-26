import { IsOptional, IsString } from "class-validator";

export class UpdateSpeakerDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  degreeEn: string;

  @IsString()
  @IsOptional()
  degreeRu: string;

  @IsString()
  @IsOptional()
  degreeUz: string;

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
  descriptionEn: string;

  @IsString()
  @IsOptional()
  descriptionRu: string;

  @IsString()
  @IsOptional()
  descriptionUz: string;

  @IsString()
  @IsOptional()
  website: string;

  @IsString()
  @IsOptional()
  image: string;
}
