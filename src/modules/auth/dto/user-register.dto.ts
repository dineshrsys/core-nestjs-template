import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength, ValidateIf } from 'class-validator';

export class UserRegisterDto {
    @ApiProperty({
        type: Boolean,
        example: false,
        name: 'is_social',
    })
    @IsNotEmpty()
    @IsBoolean()
    @Expose({ name: 'is_social' })
    readonly isSocial!: boolean;

    @ApiProperty({
        type: String,
        example: 'Good',
        required: false,
        name: 'first_name',
    })
    @IsOptional()
    @IsString()
    @Expose({ name: 'first_name' })
    readonly firstName!: string;

    @ApiProperty({
        type: String,
        example: 'Action',
        required: false,
        name: 'last_name',
    })
    @IsOptional()
    @IsString()
    @Expose({ name: 'last_name' })
    readonly lastName!: string;

    @ApiProperty({
        type: String,
        example: 'good@action.com',
    })
    @IsEmail({}, { message: 'Invalid email address' })
    @IsString()
    readonly email!: string;

    @ApiProperty({
        type: String,
        example: '!Good@action',
    })
    @ValidateIf((o) => !o.isSocial)
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
            'Password must contain at least 1 uppercase character, 1 lowercase character and 1 digit',
    })
    @IsString()
    readonly password!: string;

    @ApiProperty({
        type: String,
        example: null,
        nullable: true,
        required: false,
        name: 'country_code',
    })
    @IsOptional()
    @IsString()
    @Expose({ name: 'country_code' })
    readonly countryCode!: string;

    @ApiProperty({
        type: String,
        example: null,
        nullable: true,
        required: false,
    })
    @IsOptional()
    @IsString()
    readonly phone!: string;

    @ApiProperty({
        type: Boolean,
        default: false,
        name: 'is_terms_policy_accepted',
    })
    @IsNotEmpty()
    @IsBoolean()
    @IsOptional()
    @Expose({ name: 'is_terms_policy_accepted' })
    readonly isTermsPolicyAccepted!: boolean;
}
