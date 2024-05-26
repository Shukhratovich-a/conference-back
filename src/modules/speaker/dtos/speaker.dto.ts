import { Expose, Exclude } from "class-transformer";

export class SpeakerDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Exclude()
  degree: string;

  @Exclude()
  description: string;

  @Exclude()
  specialty: string;

  @Expose()
  website: string;

  @Expose()
  image: string;

  @Expose()
  createAt: Date;

  @Expose()
  updateAt: Date;
}
