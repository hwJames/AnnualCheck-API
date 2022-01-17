import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Qna } from './qna.entity';
import { QnaService } from './qna.service';
import { QnaController } from './qna.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Qna])],
  controllers: [QnaController],
  providers: [QnaService],
})
export class QnaModule {}
