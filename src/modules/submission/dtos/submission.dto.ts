import { Exclude, Expose } from "class-transformer";

export class SubmissionDto {
  @Expose()
  id: number;

  @Exclude()
  body: string;

  @Expose()
  createAt: Date;

  @Expose()
  updateAt: Date;
}
