import { ApiProperty } from '@nestjs/swagger';
import {
  IsString, IsOptional, MaxLength, IsNotEmpty,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateCategoryDto {
  @ApiProperty({ type: String, example: 'Community', name: 'title' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  @Expose({ name: 'title' })
  readonly categoryTitle!: string;

  @ApiProperty({
    type: String, example: null, nullable: true, required: false, name: 'description',
  })
  @IsOptional()
  @IsString()
  @Expose({ name: 'description' })
  readonly categoryDescription!: string;

  @ApiProperty({ type: Boolean, default: true, name: 'is_approved' })
  @IsOptional()
  @Expose({ name: 'is_approved' })
  readonly isApproved!: boolean;

  @ApiProperty({
    type: Number, example: null, nullable: true, required: false, name: 'icon',
  })
  @IsOptional()
  @Expose({ name: 'icon' })
  readonly iconId!: number;
}
