import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export default class JwtTokensDto {
    @ApiProperty({ type: String })
    @Expose({ name: 'token' })
    readonly accessToken: string = '';

    @ApiProperty({ type: String })
    @Expose({ name: 'refresh_token' })
    readonly refreshToken: string = '';
}
