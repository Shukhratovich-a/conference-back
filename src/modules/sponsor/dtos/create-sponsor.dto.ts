import { IsString } from "class-validator";

export class CreateSponsorDto {
  @IsString()
  titleEn: string;

  @IsString()
  titleRu: string;

  @IsString()
  titleUz: string;

  @IsString()
  website: string;

  @IsString()
  image: string;
}
