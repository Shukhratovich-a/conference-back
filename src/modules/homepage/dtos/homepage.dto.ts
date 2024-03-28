import { Exclude, Expose } from "class-transformer";

export class HomepageDto {
  @Expose()
  id: number;

  @Exclude()
  title: string;

  @Expose()
  createAt: Date;

  @Expose()
  updateAt: Date;
}
