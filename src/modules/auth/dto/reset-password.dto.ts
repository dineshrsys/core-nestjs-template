import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export default class ResetPasswordDto {
    @ApiProperty({ example: 'good@action.com' })
    @IsEmail()
    @IsString()
    readonly email!: string;

    @ApiProperty({ example: '!Good@206' })
    @IsString()
    readonly password!: string;

    @ApiProperty({ example: '!Good@206', name: 'confirm_password' })
    @IsString()
    @Expose({ name: 'confirm_password' })
    readonly confirmPassword!: string;
}
