import {
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

import { IS_OPEN_KEY, IS_PUBLIC_KEY } from '@constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const isOpen = this.reflector.getAllAndOverride<boolean>(IS_OPEN_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic || isOpen) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException({
          statusCode: HttpStatus.UNAUTHORIZED,
          error: 'AccessTokenExpired',
          message: '만료된 토근입니다.',
        })
      );
    }
    return user;
  }
}
