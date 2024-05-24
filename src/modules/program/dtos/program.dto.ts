import { Exclude, Expose } from "class-transformer";

export class ProgramDto {
  @Expose()
  id: number;

  @Exclude()
  body: string;

  @Expose()
  createAt: Date;

  @Expose()
  updateAt: Date;
}
