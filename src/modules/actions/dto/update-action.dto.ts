import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateActionDto } from '@modules/actions/dto/create-action.dto';

export class UpdateActionDto extends CreateActionDto {
    @ApiProperty({
        type: Boolean,
        example: true,
        name: 'is_approved',
    })
    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    @Expose({ name: 'is_approved' })
    isApproved!: boolean;
}
