import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CommitteeRoleEntity } from "./committee-role.entity";

import { CommitteeRoleController } from "./committee-role.controller";

import { CommitteeRoleService } from "./committee-role.service";

@Module({
  imports: [TypeOrmModule.forFeature([CommitteeRoleEntity])],
  controllers: [CommitteeRoleController],
  providers: [CommitteeRoleService],
  exports: [CommitteeRoleService],
})
export class CommitteeRoleModule {}
