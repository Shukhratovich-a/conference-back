import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { OrganizerEntity } from "./organizer.entity";

import { OrganizerController } from "./organizer.controller";

import { OrganizerService } from "./organizer.service";

@Module({
  imports: [TypeOrmModule.forFeature([OrganizerEntity])],
  controllers: [OrganizerController],
  providers: [OrganizerService],
  exports: [OrganizerService],
})
export class OrganizerModule {}
