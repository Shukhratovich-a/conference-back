import { IsString } from "class-validator";

export class CreateSectionDto {
  @IsString()
  titleEn: string;

  @IsString()
  titleRu: string;

  @IsString()
  titleUz: string;
}
