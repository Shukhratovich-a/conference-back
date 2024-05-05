import { IsString, MinLength } from "class-validator";

export class CreateAdminDto {
  @IsString()
  fullName: string;

  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  password: string;
}
