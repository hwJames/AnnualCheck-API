import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '@user/user.entity';

@Entity('tb_qna')
export class Qna {
  @PrimaryGeneratedColumn({
    unsigned: true,
    comment: '문의 번호',
  })
  qa_no: number;

  @ManyToOne(() => User, (user) => user.qnas)
  @JoinColumn({ name: 'us_no' })
  us_no: User;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '문의 등록 날짜',
  })
  regist_date: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    comment: '문의 답장 등록 날짜',
  })
  reply_date: Date;
}
