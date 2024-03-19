import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { AdminJwtStrategy } from "@strategies/admin-jwt.strategy";
import { getJWTConfig } from "@configs/jwt.config";

import { AdminEntity } from "./admin.entity";

import { AdminController } from "./admin.controller";

import { AdminService } from "./admin.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
    ConfigModule,
    PassportModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminJwtStrategy],
  exports: [AdminService],
})
export class AdminModule {}
