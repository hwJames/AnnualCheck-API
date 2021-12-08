import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';

import { CreateUserDto } from '@user/dto/create-user.dto';
import { User } from '@user/user.entity';
import { UserService } from '@user/user.service';

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
      const isMatch = await compare(pwd, user.pwd);
      if (isMatch) {
        const { pwd, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async getAccessToken(user: any) {
    const payload = {
      no: user.no,
      id: user.id,
    };

    return this.jwtService.sign(payload);
  }

  async getRefreshToken(user: any) {
    const payload = {
      no: user.no,
      id: user.id,
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('jwtRefresh.secret'),
      expiresIn: this.configService.get('jwtRefresh.expiresIn'),
    });
  }

  async signIn(user: any) {
    const payload = {
      no: user.no,
      id: user.id,
    };

    return this.jwtService.sign(payload);
  }

  async signUp(createUserDto: CreateUserDto): Promise<boolean> {
    const { id, pwd, nick } = createUserDto;

    const user = await this.userService.findOneById(id);
    if (!user) {
      const user = new User();
      user.id = id;
      user.pwd = await hash(pwd, 10);
      user.nick = nick;

      await this.userService.saveUser(user);
      return true;
    }
    return false;
  }
}
