import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { HeaderEntity } from "./header.entity";

import { HeaderController } from "./header.controller";

import { HeaderService } from "./header.service";

@Module({
  imports: [TypeOrmModule.forFeature([HeaderEntity])],
  controllers: [HeaderController],
  providers: [HeaderService],
  exports: [HeaderService],
})
export class HeaderModule {}
