import { Exclude, Expose } from "class-transformer";

export class VenueDto {
  @Expose()
  id: number;

  @Exclude()
  body: string;

  @Expose()
  createAt: Date;

  @Expose()
  updateAt: Date;
}
