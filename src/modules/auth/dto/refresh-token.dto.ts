import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ type: String, nullable: true, example: null })
  @IsNotEmpty()
  @IsString()
  readonly refreshToken!: string;
}
