import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SubmissionEntity } from "./submission.entity";

import { SubmissionController } from "./submission.controller";

import { SubmissionService } from "./submission.service";

@Module({
  imports: [TypeOrmModule.forFeature([SubmissionEntity])],
  controllers: [SubmissionController],
  providers: [SubmissionService],
  exports: [SubmissionService],
})
export class SubmissionModule {}
