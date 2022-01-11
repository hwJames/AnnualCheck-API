import { ApiProperty } from '@nestjs/swagger';
import { SuccessResponse } from './base.model';

class SignInData {
  @ApiProperty({ description: 'Accesss 토큰' })
  access_token: string;

  @ApiProperty({ description: 'Refresh 토큰' })
  refresh_token: string;
}

export class SignInResponse extends SuccessResponse {
  @ApiProperty({ description: '메시지' })
  data: SignInData;
}
