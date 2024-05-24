import { IsOptional, IsString } from "class-validator";

export class UpdateContactDto {
  @IsString()
  @IsOptional()
  bodyEn: string;

  @IsString()
  @IsOptional()
  bodyRu: string;

  @IsString()
  @IsOptional()
  bodyUz: string;

  @IsString()
  @IsOptional()
  image: string;
}
