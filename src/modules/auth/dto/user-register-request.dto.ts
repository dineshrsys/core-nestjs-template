import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class UserRegisterRequestDto {
  @ApiProperty({ type: String, example: 'regular' })
  @IsString()
  readonly type!: string;

  @ApiProperty({ type: String, example: 'good@action.com' })
  @IsEmail({}, { message: 'Invalid email address' })
  @IsString()
  readonly email!: string;

  @ApiProperty({ type: String, example: '!Good@action' })
  @IsOptional()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least 1 uppercase character, 1 lowercase character and 1 digit',
  })
  @IsString()
  readonly password!: string;

  @ApiProperty({ type: String, example: 'Good', required: false })
  @IsOptional()
  @IsString()
  readonly firstName!: string;

  @ApiProperty({ type: String, example: 'Action', required: false })
  @IsOptional()
  @IsString()
  readonly lastName!: string;

  @ApiProperty({
    type: String, example: null, nullable: true, required: false,
  })
  @IsOptional()
  @IsString()
  readonly phone!: string;

  @ApiProperty({
    type: String, example: null, nullable: true, required: false,
  })
  @IsOptional()
  @IsString()
  readonly countryCode!: string;
}
