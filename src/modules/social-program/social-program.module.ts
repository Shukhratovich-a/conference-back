import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SocialProgramEntity } from "./social-program.entity";

import { SocialProgramController } from "./social-program.controller";

import { SocialProgramService } from "./social-program.service";

@Module({
  imports: [TypeOrmModule.forFeature([SocialProgramEntity])],
  controllers: [SocialProgramController],
  providers: [SocialProgramService],
  exports: [SocialProgramService],
})
export class SocialProgramModule {}
