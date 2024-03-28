import { IsOptional, IsString } from "class-validator";

export class UpdateHomepageDto {
  @IsString()
  @IsOptional()
  mainTextEn: string;

  @IsString()
  @IsOptional()
  mainTextRu: string;

  @IsString()
  @IsOptional()
  mainTextUz: string;
}
