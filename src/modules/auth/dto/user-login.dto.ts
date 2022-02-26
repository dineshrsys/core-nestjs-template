import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsBoolean, IsEmail, IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class UserLoginDto {
    @ApiProperty({
        type: Boolean,
        default: false,
        name: "is_social"
    })
    @IsNotEmpty()
    @IsBoolean()
    @Expose({ name: "is_social" })
    readonly isSocial!: boolean;

    @ApiProperty({ example: "good@action.com" })
    @IsEmail()
    @IsString()
    readonly email!: string;

    @ApiProperty({ example: "!Good@206" })
    @ValidateIf((o) => !o.isSocial)
    @IsString()
    readonly password!: string;
}
