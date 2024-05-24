import { IsOptional, IsString } from "class-validator";

export class UpdateProgramDto {
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
