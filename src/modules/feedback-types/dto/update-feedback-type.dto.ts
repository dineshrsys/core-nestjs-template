import { PartialType } from '@nestjs/swagger';
import { CreateFeedbackTypeDto } from '@modules/feedback-types/dto/create-feedback-type.dto';

export class UpdateFeedbackTypeDto extends PartialType(CreateFeedbackTypeDto) {}
