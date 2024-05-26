import { IsOptional, IsString } from "class-validator";

export class UpdateOrganizerRoleDto {
  @IsString()
  @IsOptional()
  titleEn: string;

  @IsString()
  @IsOptional()
  titleRu: string;

  @IsString()
  @IsOptional()
  titleUz: string;
}
