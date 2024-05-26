import { IsOptional, IsString } from "class-validator";

export class CreateSpeakerDto {
  @IsString()
  name: string;

  @IsString()
  degreeEn: string;

  @IsString()
  degreeRu: string;

  @IsString()
  degreeUz: string;

  @IsString()
  specialtyEn: string;

  @IsString()
  specialtyRu: string;

  @IsString()
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
