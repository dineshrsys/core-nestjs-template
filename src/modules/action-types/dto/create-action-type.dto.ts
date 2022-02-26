import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateActionTypeDto {
    @ApiProperty({
        type: String,
        example: 'Good Action',
        name: 'name',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(140)
    @Expose({ name: 'name' })
    actionTypeName!: string;

    @ApiProperty({
        type: String,
        name: 'alternative_name',
        example: null,
        nullable: true,
    })
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @Expose({ name: 'alternative_name' })
    actionAlternativeName!: string;
}
