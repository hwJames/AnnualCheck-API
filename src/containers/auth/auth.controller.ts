import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  HttpStatus,
} from '@nestjs/common';

import { Public } from '@constants';
import { JwtRefresAuthhGuard, LocalAuthGuard } from '@guards';

import { CreateUserDto } from '@user/dto/create-user.dto';
import { UserService } from '@user/user.service';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
    this.authService = authService;
    this.userService = userService;
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Request() req) {
    const user = req.user;

    const accessToken = await this.authService.getAccessToken(user);
    const refreshToken = await this.authService.getRefreshToken(user);

    await this.userService.updateRefreshToken(user.us_id, refreshToken);

    return {
      statusCode: HttpStatus.OK,
      message: '로그인 성공',
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  @Post('check')
  async check() {
    return {
      statusCode: HttpStatus.OK,
      message: '로그인 상태입니다.',
    };
  }

  @Post('signout')
  async signOut(@Request() req) {
    const user = req.user;

    await this.userService.removeRefreshToken(user.us_id);

    return {
      statusCode: HttpStatus.OK,
      message: '로그아웃 성공',
    };
  }

  @Public()
  @UseGuards(JwtRefresAuthhGuard)
  @Post('refresh')
  async refresh(@Request() req) {
    const user = req.user;
    const accessToken = await this.authService.getAccessToken(user);

    return {
      statusCode: HttpStatus.OK,
      message: '토큰 재성성 성공',
      access_token: accessToken,
    };
  }

  @Public()
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const signup = await this.authService.signUp(createUserDto);
    if (signup) {
      return {
        statusCode: HttpStatus.OK,
        message: '회원가입 성공',
      };
    } else {
      return {
        statusCode: HttpStatus.CONFLICT,
        message: '회원가입 실패',
      };
    }
  }
}
