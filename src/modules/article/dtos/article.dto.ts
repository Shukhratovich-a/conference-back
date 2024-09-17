import { Exclude, Expose } from "class-transformer";

import { SectionDto } from "@/modules/section/dtos/section.dto";
import { UserEntity } from "@/modules/user/user.entity";

export class ArticleDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  subtitle: string;

  @Expose()
  body: string;

  @Expose()
  file: string;

  @Exclude()
  user: UserEntity;

  @Exclude()
  section: SectionDto;

  @Expose()
  createAt: Date;

  @Expose()
  updateAt: Date;
}
