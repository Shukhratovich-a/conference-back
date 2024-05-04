import { IsOptional, IsString } from "class-validator";

export class UpdateHeaderDto {
  @IsString()
  @IsOptional()
  logo: string;

  @IsString()
  mainTextEn: string;

  @IsString()
  mainTextRu: string;

  @IsString()
  mainTextUz: string;
}
