import { Exclude, Expose } from "class-transformer";

export class HeaderDto {
  @Expose()
  id: number;

  @Exclude()
  mainText: string;

  @Expose()
  logo: string;

  @Expose()
  createAt: Date;

  @Expose()
  updateAt: Date;
}
