import {
  Controller,
  Body,
  HttpStatus,
  ConflictException,
  Post,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ArrayErrorResponse, ErrorResponse, SuccessResponse } from '@models';

import { Public } from '@constants';

import { UserService } from './user.service';
import { CreateSocialUserDto, CreateUserDto } from './dto/create-user.dto';

@Controller('v1/user')
@ApiTags('유저 API')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/')
  @Public()
  // #region Swagger
  @ApiSecurity('key')
  @ApiOperation({ summary: '회원가입 API' })
  @ApiCreatedResponse({ description: '회원가입 성공', type: SuccessResponse })
  @ApiConflictResponse({
    description: '회원가입 실패 (사용하고 있는 아이디)',
    type: ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: '비정상 토큰',
    type: ErrorResponse,
  })
  @ApiBadRequestResponse({
    description: 'Request 데이터 오류',
    type: ArrayErrorResponse,
  })
  // #endregion
  async signUp(@Body() createUserDto: CreateUserDto) {
    const signup = await this.userService.signUp(createUserDto);

    if (!signup) {
      throw new ConflictException({
        statusCode: HttpStatus.CONFLICT,
        error: 'CONFLICT',
        message: '사용하고 있는 아이디 입니다.',
      });
    }

    return {
      statusCode: HttpStatus.CREATED,
      message: '회원가입 성공',
    };
  }

  @Post('/social')
  @Public()
  // #region Swagger
  @ApiSecurity('key')
  @ApiOperation({ summary: '소셜 회원가입 API' })
  @ApiCreatedResponse({ description: '회원가입 성공', type: SuccessResponse })
  @ApiConflictResponse({
    description: '회원가입 실패 (사용하고 있는 아이디)',
    type: ErrorResponse,
  })
  @ApiUnauthorizedResponse({
    description: '비정상 토큰',
    type: ErrorResponse,
  })
  @ApiBadRequestResponse({
    description: 'Request 데이터 오류',
    type: ArrayErrorResponse,
  })
  // #endregion
  async socialSignUp(@Body() createSocialUserDto: CreateSocialUserDto) {
    // if (!signup) {
    //   throw new ConflictException({
    //     statusCode: HttpStatus.CONFLICT,
    //     error: 'CONFLICT',
    //     message: '사용하고 있는 아이디 입니다.',
    //   });
    // }

    return {
      statusCode: HttpStatus.CREATED,
      message: '회원가입 성공',
    };
  }
}
