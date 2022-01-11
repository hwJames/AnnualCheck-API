import {
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { IS_OPEN_KEY } from '@constants';

@Injectable()
export class ApiKeyAuthGuard extends AuthGuard('api-key') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isOpen = this.reflector.getAllAndOverride<boolean>(IS_OPEN_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isOpen) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, data) {
    if (err || !data) {
      throw (
        err ||
        new UnauthorizedException({
          statusCode: HttpStatus.UNAUTHORIZED,
          error: 'ApiKeyUnauthorized',
          message: '유효하지 않는 Key 값입니다.',
        })
      );
    }
    return data;
  }
}
