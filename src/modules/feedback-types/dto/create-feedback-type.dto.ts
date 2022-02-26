import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateFeedbackTypeDto {
    @ApiProperty({
        type: String,
        example: 'Suggestion',
        name: 'name',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @Expose({ name: 'name' })
    feedbackName!: string;
}
