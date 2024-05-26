import { IsString } from "class-validator";

export class CreateCommitteeRoleDto {
  @IsString()
  titleEn: string;

  @IsString()
  titleRu: string;

  @IsString()
  titleUz: string;
}
