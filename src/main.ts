import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@pipes';
import * as basicAuth from 'express-basic-auth';

// Logger
import { logger, stream } from '@utils/winston.util';
import * as morgan from 'morgan';

// Config
import { configuration } from '@configs';

async function bootstrap() {
  const { port, docsPwd, keyHeader } = configuration();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: logger,
  });

  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        anuualcheck: docsPwd,
      },
    }),
  );

  if (configuration().env == 'dev') {
    const config = new DocumentBuilder()
      .setTitle('AnnualCheck API')
      .setDescription('연차체크 API 명세서')
      .setVersion('0.0.1')
      .addApiKey({ type: 'apiKey', name: keyHeader, in: 'header' }, 'key')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'access',
          description: 'Enter access token',
          in: 'header',
        },
        'access',
      )
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'refresh',
          description: 'Enter refresh token',
          in: 'header',
        },
        'refresh',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }
  // morgan 세팅
  app.use(
    morgan(':url :method :status :response-time :user-agent :remote-addr', {
      stream,
    }),
  );

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}

bootstrap();
