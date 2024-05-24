import { IsOptional, IsString } from "class-validator";

export class UpdateDateDto {
  @IsString()
  @IsOptional()
  bodyEn: string;

  @IsString()
  @IsOptional()
  bodyRu: string;

  @IsString()
  @IsOptional()
  bodyUz: string;
}
