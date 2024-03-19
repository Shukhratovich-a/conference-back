import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";

import { ExtractJwt, Strategy } from "passport-jwt";

import { UserEntity } from "@modules/user/user.entity";

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, "user-jwt") {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get("JWT_SECRET"),
    });
  }

  async validate({ email }: Pick<UserEntity, "email">) {
    return email;
  }
}
