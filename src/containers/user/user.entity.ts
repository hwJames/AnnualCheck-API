import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

import { Role } from '@enums/user.enum';

@Entity('tb_user')
export class User {
  @PrimaryGeneratedColumn({
    comment: '유저 번호',
  })
  no: number;

  @Column({
    unique: true,
    length: 50,
    comment: '유저 아이디',
  })
  id: string;

  @Column({
    comment: '유저 비밀번호',
  })
  pwd: string;

  @Column({
    length: 20,
    comment: '유저 닉네임',
  })
  nick: string;

  @Column({
    nullable: true,
    type: 'set',
    enum: Role,
    comment: '유저 타입',
  })
  type: Role[];

  @Column({
    nullable: true,
    comment: '유저 리프레쉬 토큰',
  })
  @Exclude()
  refresh_token: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '유저 등록 날짜',
  })
  regist_date: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '유저 업데이트 날짜',
  })
  update_date: Date;
}
