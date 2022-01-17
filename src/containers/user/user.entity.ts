import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Regist, Role } from '@enums/user.enum';

import { Annual, UserAnnual } from '@annual/annual.entity';
import { Qna } from '@containers/qna/qna.entity';

@Entity('tb_user')
export class User {
  @PrimaryGeneratedColumn({
    unsigned: true,
    comment: '유저 번호',
  })
  us_no: number;

  @Column({
    unique: true,
    length: 50,
    comment: '유저 아이디',
  })
  us_id: string;

  @Column({
    nullable: true,
    comment: '유저 비밀번호',
  })
  us_pwd: string;

  @Column({
    length: 20,
    comment: '유저 닉네임',
  })
  us_nick: string;

  @Column({
    type: 'set',
    enum: Role,
    default: Role.User,
    comment: '유저 타입',
  })
  us_type: Role[];

  @Column({
    type: 'enum',
    enum: Regist,
    default: Regist.Email,
    comment: '유저 가입 타입',
  })
  regist_type: Regist;

  @Index()
  @Column({
    type: 'text',
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

  @OneToMany(() => Annual, (annual) => annual.us_no)
  annuals: Annual[];

  @OneToOne(() => UserAnnual, (annual) => annual.us_no)
  annual: UserAnnual;

  @OneToMany(() => Qna, (annual) => annual.us_no)
  qnas: Qna[];
}
