import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: '아이디' })
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '비밀번호' })
  pwd: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '닉네임' })
  nick: string;
}
export class CreateSocialUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: '아이디' })
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '닉네임' })
  nick: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '소셜로그인 타입' })
  regist_type: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '소셜로그인 토큰' })
  access_token: string;
}
