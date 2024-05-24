import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SponsorEntity } from "./sponsor.entity";

import { SponsorController } from "./sponsor.controller";

import { SponsorService } from "./sponsor.service";

@Module({
  imports: [TypeOrmModule.forFeature([SponsorEntity])],
  controllers: [SponsorController],
  providers: [SponsorService],
  exports: [SponsorService],
})
export class SponsorModule {}
