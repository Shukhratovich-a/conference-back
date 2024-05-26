import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CommitteeEntity } from "./committee.entity";

import { CommitteeController } from "./committee.controller";

import { CommitteeService } from "./committee.service";

@Module({
  imports: [TypeOrmModule.forFeature([CommitteeEntity])],
  controllers: [CommitteeController],
  providers: [CommitteeService],
  exports: [CommitteeService],
})
export class CommitteeModule {}
