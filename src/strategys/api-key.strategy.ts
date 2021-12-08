import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-headerapikey';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor(private readonly configService: ConfigService) {
    super(
      { header: configService.get('keyHeader'), prefix: '' },
      false,
      (apiKey: string, done) => {
        if (this.configService.get('key') !== apiKey) {
          done(null, false);
        }
        done(null, true);
      },
    );
  }
}
