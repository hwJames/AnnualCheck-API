import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Request } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserService } from '@user/user.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwtRefresh.secret'),
      passReqToCallback: true,
    });
  }

  async validate(@Request() req, payload: any) {
    const refreshToken = req.get('authorization').replace('Bearer ', '');
    return this.userService.matchRefreshToken(payload.us_id, refreshToken);
  }
}
