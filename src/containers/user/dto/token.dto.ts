import { IsEmail, IsNumber, IsString } from 'class-validator';

export class TokenDto {
  @IsNumber()
  us_no: number;

  @IsEmail()
  us_id: string;

  @IsString()
  us_nick: string;
}
