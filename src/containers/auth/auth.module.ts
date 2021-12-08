import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import {
  LocalStrategy,
  JwtStrategy,
  JwtRefreshStrategy,
  ApiKeyStrategy,
} from '@strategys';

import { UserModule } from '@user/user.module';
import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';
import { AppService } from '@src/app.service';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('jwt'),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    AppService,
    ApiKeyStrategy,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
