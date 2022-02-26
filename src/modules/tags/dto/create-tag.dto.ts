import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
    @ApiProperty({
        type: String,
        example: 'Donation',
        name: 'title',
    })
    @IsNotEmpty()
    @IsString()
    @Expose({ name: 'title' })
    tagTitle!: string;
}
