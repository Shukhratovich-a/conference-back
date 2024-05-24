import { Exclude, Expose } from "class-transformer";

export class AccommodationDto {
  @Expose()
  id: number;

  @Exclude()
  body: string;

  @Expose()
  createAt: Date;

  @Expose()
  updateAt: Date;
}
