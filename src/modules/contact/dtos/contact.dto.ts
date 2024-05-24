import { Exclude, Expose } from "class-transformer";

export class ContactDto {
  @Expose()
  id: number;

  @Exclude()
  body: string;

  @Expose()
  createAt: Date;

  @Expose()
  updateAt: Date;
}
