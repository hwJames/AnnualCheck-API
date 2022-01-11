import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponse {
  @ApiProperty({ description: '상태 코드' })
  statusCode: number;

  @ApiProperty({ description: '메시지' })
  message: string;
}

export class ErrorResponse {
  @ApiProperty({ description: '상태 코드' })
  statusCode: number;

  @ApiProperty({ description: '에러 코드' })
  error: string;

  @ApiProperty({ description: '메시지' })
  message: string;
}

export class ArrayErrorResponse {
  @ApiProperty({ description: '상태 코드' })
  statusCode: number;

  @ApiProperty({ description: '에러 코드' })
  error: [string];

  @ApiProperty({ description: '메시지' })
  message: string;
}
