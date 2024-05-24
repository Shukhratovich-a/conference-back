import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { DateEntity } from "./date.entity";

import { DateController } from "./date.controller";

import { DateService } from "./date.service";

@Module({
  imports: [TypeOrmModule.forFeature([DateEntity])],
  controllers: [DateController],
  providers: [DateService],
  exports: [DateService],
})
export class DateModule {}
