import { Exclude, Expose } from "class-transformer";

export class HomepageDto {
  @Expose()
  id: number;

  @Expose()
  poster: number;

  @Exclude()
  mainText: string;

  @Exclude()
  title: string;

  @Expose()
  createAt: Date;

  @Expose()
  updateAt: Date;
}
