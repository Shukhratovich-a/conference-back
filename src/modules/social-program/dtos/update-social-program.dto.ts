import { IsOptional, IsString } from "class-validator";

export class UpdateSocialProgramDto {
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
