import { IsOptional, IsString } from "class-validator";

export class UpdateHomepageDto {
  @IsString()
  @IsOptional()
  poster: string;

  @IsString()
  titleEn: string;

  @IsString()
  titleRu: string;

  @IsString()
  titleUz: string;

  @IsString()
  mainTextEn: string;

  @IsString()
  mainTextRu: string;

  @IsString()
  mainTextUz: string;
}
