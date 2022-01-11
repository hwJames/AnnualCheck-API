import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { Role } from '@enums/user.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOneById(id: string): Promise<User> {
    return this.userRepository.findOne({ us_id: id });
  }

  async saveUser(user: User): Promise<void> {
    await this.userRepository.save(user);
  }

  async checkUpOnType(id: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      us_id: id,
      us_type: Not(IsNull()),
    });

    if (user) {
      return true;
    }

    return false;
  }

  async updateType(id: string, type: Role[]) {
    await this.userRepository.update({ us_id: id }, { us_type: type });
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    const hashRefreshToken = await hash(refreshToken, 10);
    await this.userRepository.update(
      { us_id: id },
      { refresh_token: hashRefreshToken },
    );
  }

  async removeRefreshToken(id: string) {
    await this.userRepository.update(
      { us_id: id },
      {
        refresh_token: null,
      },
    );
  }

  async matchRefreshToken(id: string, refreshToken: string) {
    const user = await this.findOneById(id);
    if (user && user.refresh_token) {
      const isMatch = await compare(refreshToken, user.refresh_token);
      if (isMatch) {
        const { us_pwd, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async signUp(createUserDto: CreateUserDto): Promise<boolean> {
    const { id, pwd, nick } = createUserDto;

    const user = await this.findOneById(id);
    if (!user) {
      const user = new User();
      user.us_id = id;
      user.us_pwd = await hash(pwd, 10);
      user.us_nick = nick;

      await this.saveUser(user);
      return true;
    }
    return false;
  }
}
