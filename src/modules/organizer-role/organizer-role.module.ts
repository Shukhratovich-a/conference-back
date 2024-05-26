import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { OrganizerRoleEntity } from "./organizer-role.entity";

import { OrganizerRoleController } from "./organizer-role.controller";

import { OrganizerRoleService } from "./organizer-role.service";

@Module({
  imports: [TypeOrmModule.forFeature([OrganizerRoleEntity])],
  controllers: [OrganizerRoleController],
  providers: [OrganizerRoleService],
  exports: [OrganizerRoleService],
})
export class OrganizerRoleModule {}
