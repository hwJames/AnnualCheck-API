import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Config
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration, database, jwt, jwtRefresh } from '@configs';

// GUARD
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard, RolesGuard } from '@guards';

// TypeORM
import { TypeOrmModule } from '@nestjs/typeorm';

// Joi
import * as Joi from 'joi';

// Module
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration, database, jwt, jwtRefresh],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').default('prod'),
        PORT: Joi.number().default(3000),

        APP_NAME: Joi.string().default('Nest'),
        APP_URL: Joi.string().default('http://localhsot'),

        APP_KEY_HEADER: Joi.string().default('KEY'),
        APP_KEY: Joi.string().default('1234'),

        DB_HOST: Joi.string().default('localhost'),
        DB_PORT: Joi.number().default(3306),
        DB_USER: Joi.string().default('root'),
        DB_PWD: Joi.string().default('1234'),
        DB_NAME: Joi.string().default('app'),

        JWT_SECRET: Joi.string().default('jwtSecretKey'),
        JWT_TIME: Joi.string().default('3600s'),
        JWT_REFRESH_SECRET: Joi.string().default('jwtRefreshSecretKey'),
        JWT_REFRESH_TIME: Joi.string().default('604800s'),
      }),
      validationOptions: {
        // .ENV Test
        // allowUnknown: false,
        // abortEarly: false,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
