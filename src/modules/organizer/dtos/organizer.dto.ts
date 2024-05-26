import { Exclude, Expose } from "class-transformer";

export class OrganizerDto {
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
  organizerRole: string;

  @Expose()
  createAt: Date;

  @Expose()
  updateAt: Date;
}
