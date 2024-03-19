import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { UserJwtStrategy } from "@strategies/user-jwt.strategy";
import { getJWTConfig } from "@configs/jwt.config";

import { UserEntity } from "./user.entity";

import { UserController } from "./user.controller";

import { UserService } from "./user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
    ConfigModule,
    PassportModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserJwtStrategy],
  exports: [UserService],
})
export class UserModule {}
