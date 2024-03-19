import { IsString, IsOptional, IsNumber } from "class-validator";

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsNumber()
  topicId: number;

  @IsString()
  @IsOptional()
  subtitle?: string;

  @IsString()
  body: string;

  @IsNumber()
  userId: number;

  @IsString()
  @IsOptional()
  file?: string;
}
