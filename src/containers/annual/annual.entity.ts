import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { User } from '@user/user.entity';

@Entity('tb_user_annual')
export class UserAnnual {
  @OneToOne(() => User, (user) => user.annual, { primary: true })
  @JoinColumn({ name: 'us_no' })
  us_no: User;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '유저 연차 정보 등록 날짜',
  })
  regist_date: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '유저 연차 정보 업데이트 날짜',
  })
  update_date: Date;
}

@Entity('tb_annual')
export class Annual {
  @PrimaryGeneratedColumn({
    unsigned: true,
    comment: '연차 번호',
  })
  an_no: number;

  @ManyToOne(() => User, (user) => user.annuals)
  @JoinColumn({ name: 'us_no' })
  us_no: User;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '연차 등록 날짜',
  })
  regist_date: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '연차 업데이트 날짜',
  })
  update_date: Date;
}
