import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ApiKeyAuthGuard extends AuthGuard('api-key') {
  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest(err, data) {
    if (err || !data) {
      throw (
        err ||
        new UnauthorizedException({
          statusCode: HttpStatus.UNAUTHORIZED,
          errorCode: 'ApiKeyUnauthorized',
          message: '유효하지 않는 Key 값입니다.',
        })
      );
    }
    return data;
  }
}
