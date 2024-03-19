import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";

import { getJWTConfig } from "@configs/jwt.config";

import { ArticleEntity } from "./article.entity";

import { ArticleController } from "./article.controller";

import { ArticleService } from "./article.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
