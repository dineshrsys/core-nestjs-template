import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

import { VISIBLE_TO_ENTITY_ENUM } from '@constants/events.constant';

export class CreateActionDto {
    @ApiProperty({
        type: Number,
        example: null,
        name: 'action_type',
        nullable: true,
    })
    @IsNotEmpty()
    @IsNumber()
    @Expose({ name: 'action_type' })
    actionTypeId!: number;

    @ApiProperty({
        type: String,
        example: 'Donate an item',
        name: 'title',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(140)
    @Expose({ name: 'title' })
    actionTitle!: string;

    @ApiProperty({
        type: String,
        example: 'Donate an extra item to someone who need',
        name: 'description',
    })
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MaxLength(255)
    @Expose({ name: 'description' })
    actionDescription!: string;

    @ApiProperty({
        type: Number,
        example: null,
        nullable: true,
        name: 'icon_id',
    })
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    @Expose({ name: 'icon_id' })
    actionIconId!: number;

    @ApiProperty({
        enum: ['User', 'Organization'],
        example: 'User',
        nullable: true,
        name: 'visible_to',
    })
    @ApiPropertyOptional()
    @IsNotEmpty()
    @IsString()
    @Expose({ name: 'visible_to' })
    visibleToEntity!: VISIBLE_TO_ENTITY_ENUM;
}
