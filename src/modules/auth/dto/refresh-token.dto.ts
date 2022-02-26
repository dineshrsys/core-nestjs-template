import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
    @ApiProperty({
        type: String,
        example: '2dfe32731f66d0ab02cba3eb065cceec7b32d260066928faf1dec2be201ccd2fDmE8cpxCNLdfjIGv',
        name: 'refresh_token',
    })
    @IsNotEmpty()
    @IsString()
    @Expose({ name: 'refresh_token' })
    readonly refreshToken!: string;
}
