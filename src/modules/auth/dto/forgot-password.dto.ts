import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export default class ForgotPasswordDto {
    @ApiProperty({ example: 'good@action.com' })
    @IsEmail()
    @IsString()
    readonly email!: string;
}
