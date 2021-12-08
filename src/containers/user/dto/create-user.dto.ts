import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  id: string;

  @IsString()
  pwd: string;

  @IsString()
  nick: string;
}
