import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SpeakerEntity } from "./speaker.entity";

import { SpeakerController } from "./speaker.controller";

import { SpeakerService } from "./speaker.service";

@Module({
  imports: [TypeOrmModule.forFeature([SpeakerEntity])],
  controllers: [SpeakerController],
  providers: [SpeakerService],
  exports: [SpeakerService],
})
export class SpeakerModule {}
