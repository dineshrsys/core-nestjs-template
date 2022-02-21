import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginRequestDto {
  @ApiProperty({ example: 'good@action.com' })
  @IsEmail()
  @IsString()
  readonly email!: string;

  @ApiProperty({ example: '!Good@206' })
  @IsString()
  readonly password!: string;
}
