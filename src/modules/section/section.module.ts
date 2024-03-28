import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SectionEntity } from "./section.entity";

import { SectionController } from "./section.controller";

import { SectionService } from "./section.service";

@Module({
  imports: [TypeOrmModule.forFeature([SectionEntity])],
  controllers: [SectionController],
  providers: [SectionService],
  exports: [SectionService],
})
export class SectionModule {}
