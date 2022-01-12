import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcryptjs';

import { CreateUserDto } from '@user/dto/create-user.dto';
import { User } from '@user/user.entity';
import { UserService } from '@user/user.service';
import { TokenDto } from '@user/dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser(id: string, pwd: string): Promise<any> {
    const user = await this.userService.findOneById(id);
    if (user) {
      const isMatch = await compare(pwd, user.us_pwd);
      if (isMatch) {
        const { us_pwd, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async getAccessToken(user: TokenDto) {
    const payload = {
      us_no: user.us_no,
      us_id: user.us_id,
      us_nick: user.us_nick,
    };

    return this.jwtService.sign(payload);
  }

  async getRefreshToken(user: TokenDto) {
    const payload = {
      us_no: user.us_no,
      us_id: user.us_id,
      us_nick: user.us_nick,
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('jwtRefresh.secret'),
      expiresIn: this.configService.get('jwtRefresh.expiresIn'),
    });
  }

  async signIn(user: TokenDto) {
    const payload = {
      us_no: user.us_no,
      us_id: user.us_id,
      us_nick: user.us_nick,
    };

    return this.jwtService.sign(payload);
  }

  async signUp(createUserDto: CreateUserDto): Promise<boolean> {
    const { id, pwd, nick } = createUserDto;

    const user = await this.userService.findOneById(id);
    if (!user) {
      const user = new User();
      user.us_id = id;
      user.us_pwd = await hash(pwd, 10);
      user.us_nick = nick;

      await this.userService.saveUser(user);
      return true;
    }
    return false;
  }
}
