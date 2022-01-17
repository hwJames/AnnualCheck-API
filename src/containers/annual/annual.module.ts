import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Annual, UserAnnual } from './annual.entity';
import { AnnualService } from './annual.service';
import { AnnualController } from './annual.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserAnnual, Annual])],
  controllers: [AnnualController],
  providers: [AnnualService],
})
export class AnnualModule {}
