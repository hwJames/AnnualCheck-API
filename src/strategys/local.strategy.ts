import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '@auth/auth.service';
import { User } from '@user/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'id',
      passwordField: 'pwd',
    });
  }

  async validate(id: string, pwd: string): Promise<User> {
    const user = await this.authService.validateUser(id, pwd);
    if (!user) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        error: 'SignUnauthorized',
        message: 'Invalid username or password',
      });
    }
    return user;
  }
}
