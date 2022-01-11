import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { Open } from '@constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Open()
  getHello(): string {
    return this.appService.getHello();
  }
}
