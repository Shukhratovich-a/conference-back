import { Exclude, Expose } from "class-transformer";

export class CommitteeDto {
  @Expose()
  id: number;

  @Exclude()
  name: string;

  @Exclude()
  specialty: string;

  @Exclude()
  country: string;

  @Exclude()
  city: string;

  @Exclude()
  role: string;

  @Exclude()
  committeeRole: string;

  @Expose()
  createAt: Date;

  @Expose()
  updateAt: Date;
}
