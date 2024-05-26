import { IsString } from "class-validator";

export class CreateOrganizerRoleDto {
  @IsString()
  titleEn: string;

  @IsString()
  titleRu: string;

  @IsString()
  titleUz: string;
}
