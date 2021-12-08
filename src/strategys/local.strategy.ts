import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '@auth/auth.service';
import { User } from '@user/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'us_id',
      passwordField: 'us_pwd',
    });
  }

  async validate(us_id: string, us_pwd: string): Promise<User> {
    const user = await this.authService.validateUser(us_id, us_pwd);
    if (!user) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        errorCode: 'SignUnauthorized',
        message: 'Invalid username or password',
      });
    }
    return user;
  }
}
