import { Injectable } from '@nestjs/common';

import { configuration } from '@configs';

@Injectable()
export class AppService {
  getHello(): string {
    const appConfig = configuration();

    return appConfig.name;
  }
}
