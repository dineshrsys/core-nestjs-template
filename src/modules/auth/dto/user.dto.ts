import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import JwtTokensDto from '@modules/auth/dto/jwt-tokens.dto';
import { Image } from '@modules/images/entities/image.entity';
import { ApiProperty } from '@nestjs/swagger';

class User {
    @ApiProperty()
    @Type(() => Number)
    @Expose({ name: 'id' })
    readonly userId!: number;

    @ApiProperty()
    @Expose({ name: 'first_name' })
    readonly firstName!: string;

    @ApiProperty()
    @Expose({ name: 'last_name' })
    readonly lastName!: string;

    @ApiProperty()
    @Expose({ name: 'email' })
    readonly email!: string;

    @ApiProperty()
    @Expose({ name: 'phone' })
    readonly phone!: string;

    @ApiProperty()
    @Expose({ name: 'country_code' })
    readonly countryCode!: string;

    @ApiProperty()
    @Expose({ name: 'is_email_verified' })
    readonly isEmailVerified!: boolean;

    @ApiProperty()
    @Expose({ name: 'is_phone_verified' })
    readonly isPhoneVerified!: boolean;

    @ApiProperty()
    @Type(() => Image)
    @Expose({ name: 'profile_image' })
    readonly profileImage!: Image;
}

export class UserDto {
    constructor(user: User, accessToken?: JwtTokensDto) {
        this.user = user;
        this.accessToken = accessToken;
    }

    @Type(() => User)
    @ValidateNested()
    @Expose({ name: 'user' })
    user!: User;

    @Expose({ name: 'access_token' })
    @Type(() => JwtTokensDto)
    @ValidateNested()
    accessToken!: JwtTokensDto | undefined;
}
