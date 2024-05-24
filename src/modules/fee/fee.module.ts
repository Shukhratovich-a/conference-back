import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { FeeEntity } from "./fee.entity";

import { FeeController } from "./fee.controller";

import { FeeService } from "./fee.service";

@Module({
  imports: [TypeOrmModule.forFeature([FeeEntity])],
  controllers: [FeeController],
  providers: [FeeService],
  exports: [FeeService],
})
export class FeeModule {}
