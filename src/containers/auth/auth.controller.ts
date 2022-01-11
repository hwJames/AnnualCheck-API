import {
  Controller,
  Post,
  UseGuards,
  Request,
  HttpStatus,
  Delete,
  Get,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ArrayErrorResponse, ErrorResponse, SignInResponse } from '@models';

import { Public } from '@constants';
import { JwtRefresAuthhGuard, LocalAuthGuard } from '@guards';

import { UserService } from '@user/user.service';
import { AuthService } from './auth.service';
import { TokenDto } from '@user/dto/token.dto';

@Controller('v1/auth')
@ApiTags('보안 API')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
    this.authService = authService;
    this.userService = userService;
  }

  @Post('/sign')
  @Public()
  @UseGuards(LocalAuthGuard)
  // #region Swagger
  @ApiSecurity('key')
  @ApiOperation({ summary: '로그인 API' })
  @ApiCreatedResponse({ description: '로그인 성공', type: SignInResponse })
  @ApiUnauthorizedResponse({
    description: '비정상 토큰 OR Request 데이터 오류',
    type: ErrorResponse,
  })
  @ApiBadRequestResponse({
    description: 'Request 데이터 오류',
    type: ArrayErrorResponse,
  })
  // #endregion
  async signIn(@Request() req) {
    const user: TokenDto = req.user;

    // 토큰 재발급
    const newAccessToken = await this.authService.getAccessToken(user);
    const newRefreshToken = await this.authService.getRefreshToken(user);

    // 토큰 값 업데이트
    await this.userService.updateRefreshToken(user.us_id, newRefreshToken);

    return {
      statusCode: HttpStatus.CREATED,
      message: '로그인 성공',
      data: {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
      },
    };
  }

  @Post('/sign/social')
  @Public()
  @UseGuards(LocalAuthGuard)
  // #region Swagger
  @ApiSecurity('key')
  @ApiOperation({ summary: '소셜 로그인 API' })
  @ApiCreatedResponse({ description: '로그인 성공', type: SignInResponse })
  @ApiUnauthorizedResponse({
    description: '비정상 토큰 OR Request 데이터 오류',
    type: ErrorResponse,
  })
  @ApiBadRequestResponse({
    description: 'Request 데이터 오류',
    type: ArrayErrorResponse,
  })
  // #endregion
  async SocialSignIn(@Request() req) {
    const user: TokenDto = req.user;

    // 토큰 재발급
    const newAccessToken = await this.authService.getAccessToken(user);
    const newRefreshToken = await this.authService.getRefreshToken(user);

    // 토큰 값 업데이트
    await this.userService.updateRefreshToken(user.us_id, newRefreshToken);

    return {
      statusCode: HttpStatus.CREATED,
      message: '로그인 성공',
      data: {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
      },
    };
  }

  @Delete('/sign')
  @ApiSecurity('key')
  @ApiOperation({ summary: '로그아웃 API' })
  async signOut(@Request() req) {
    const user: TokenDto = req.user;

    // 토큰 삭제
    await this.userService.removeRefreshToken(user.us_id);

    return {
      statusCode: HttpStatus.OK,
      message: '로그아웃 성공',
    };
  }

  @Get('/sign')
  @ApiSecurity('key')
  @ApiOperation({ summary: '로그인 확인 API' })
  async check(@Request() req) {
    const user: TokenDto = req.user;

    console.log(user);

    return {
      statusCode: HttpStatus.OK,
      message: '로그인 상태입니다.',
    };
  }

  @Post('/sign/new')
  @Public()
  @UseGuards(JwtRefresAuthhGuard)
  @ApiSecurity('key')
  @ApiOperation({ summary: '토큰 재발급 API' })
  async refresh(@Request() req) {
    const user: TokenDto = req.user;

    // 토큰 재발급
    const newAccessToken = await this.authService.getAccessToken(user);

    return {
      statusCode: HttpStatus.OK,
      message: '토큰 재발급 성공',
      data: {
        access_token: newAccessToken,
      },
    };
  }
}
