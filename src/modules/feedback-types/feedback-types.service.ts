import { Injectable } from '@nestjs/common';
import { CreateFeedbackTypeDto } from '@modules/feedback-types/dto/create-feedback-type.dto';
import { UpdateFeedbackTypeDto } from '@modules/feedback-types/dto/update-feedback-type.dto';

@Injectable()
export class FeedbackTypesService {
  create(createFeedbackTypeDto: CreateFeedbackTypeDto) {
    return 'This action adds a new feedbackType';
  }

  findAll() {
    return `This action returns all feedbackTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feedbackType`;
  }

  update(id: number, updateFeedbackTypeDto: UpdateFeedbackTypeDto) {
    return `This action updates a #${id} feedbackType`;
  }

  remove(id: number) {
    return `This action removes a #${id} feedbackType`;
  }
}
