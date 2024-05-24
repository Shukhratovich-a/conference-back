import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AccommodationEntity } from "./accommodation.entity";

import { AccommodationController } from "./accommodation.controller";

import { AccommodationService } from "./accommodation.service";

@Module({
  imports: [TypeOrmModule.forFeature([AccommodationEntity])],
  controllers: [AccommodationController],
  providers: [AccommodationService],
  exports: [AccommodationService],
})
export class AccommodationModule {}
