import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateFeedbackTypeDto } from '@modules/feedback-types/dto/create-feedback-type.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdateFeedbackTypeDto extends CreateFeedbackTypeDto {
    @ApiProperty({
        type: Boolean,
        name: 'is_approved',
    })
    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    @Expose({ name: 'is_approved' })
    isApproved!: boolean;
}
