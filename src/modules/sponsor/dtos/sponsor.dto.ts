import { Exclude, Expose } from "class-transformer";

export class SponsorDto {
  @Expose()
  id: number;

  @Exclude()
  title: string;

  @Expose()
  website: string;

  @Expose()
  image: string;

  @Expose()
  createAt: Date;

  @Expose()
  updateAt: Date;
}
