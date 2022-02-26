import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateCategoryDto {
    @ApiProperty({
        type: String,
        example: 'Community',
        name: 'title',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(140)
    @Expose({ name: 'title' })
    readonly categoryTitle!: string;

    @ApiProperty({
        type: String,
        example: null,
        nullable: true,
        name: 'description',
    })
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MaxLength(255)
    @Expose({ name: 'description' })
    readonly categoryDescription!: string;

    @ApiProperty({
        type: Boolean,
        default: true,
        name: 'is_approved',
    })
    @IsBoolean()
    @Expose({ name: 'is_approved' })
    readonly isApproved!: boolean;

    @ApiProperty({
        type: Number,
        example: null,
        name: 'icon',
        nullable: true,
    })
    @IsOptional()
    @Expose({ name: 'icon' })
    readonly iconId!: number;
}
