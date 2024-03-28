import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { HomepageEntity } from "./homepage.entity";

import { HomepageController } from "./homepage.controller";

import { HomepageService } from "./homepage.service";

@Module({
  imports: [TypeOrmModule.forFeature([HomepageEntity])],
  controllers: [HomepageController],
  providers: [HomepageService],
  exports: [HomepageService],
})
export class HomepageModule {}
