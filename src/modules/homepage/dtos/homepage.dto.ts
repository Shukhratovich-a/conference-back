import { Exclude, Expose } from "class-transformer";

export class HomepageDto {
  @Expose()
  id: number;

  @Exclude()
  mainText: string;

  @Expose()
  createAt: Date;

  @Expose()
  updateAt: Date;
}
