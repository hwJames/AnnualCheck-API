import { Controller } from '@nestjs/common';
import { AnnualService } from './annual.service';

@Controller('annual')
export class AnnualController {
  constructor(private readonly annualService: AnnualService) {}
}
