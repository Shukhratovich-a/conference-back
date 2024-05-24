import { IsOptional, IsString } from "class-validator";

export class UpdateSponsorDto {
  @IsString()
  @IsOptional()
  titleEn: string;

  @IsString()
  @IsOptional()
  titleRu: string;

  @IsString()
  @IsOptional()
  titleUz: string;

  @IsString()
  @IsOptional()
  website: string;

  @IsString()
  @IsOptional()
  image: string;
}
