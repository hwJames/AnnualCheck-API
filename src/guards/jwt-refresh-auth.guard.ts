import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtRefresAuthhGuard extends AuthGuard('jwt-refresh') {
  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException({
          statusCode: HttpStatus.UNAUTHORIZED,
          error: 'RefreshTokenExpired',
          message: '만료된 토근입니다.',
        })
      );
    }
    return user;
  }
}
