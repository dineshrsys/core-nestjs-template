import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { FeedbackTypesService } from '@modules/feedback-types/feedback-types.service';
import { CreateFeedbackTypeDto } from '@modules/feedback-types/dto/create-feedback-type.dto';
import { UpdateFeedbackTypeDto } from '@modules/feedback-types/dto/update-feedback-type.dto';

@Controller()
@ApiTags('Feedback Types')
export class FeedbackTypesController {
  constructor(private readonly feedbackTypesService: FeedbackTypesService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createFeedbackTypeDto: CreateFeedbackTypeDto) {
    return this.feedbackTypesService.create(createFeedbackTypeDto);
  }

  @Get()
  findAll() {
    return this.feedbackTypesService.findAll();
  }

  @Get(':feedbackTypeId')
  @ApiBearerAuth()
  findOne(@Param('feedbackTypeId') feedbackTypeId: string) {
    return this.feedbackTypesService.findOne(+feedbackTypeId);
  }

  @Patch(':feedbackTypeId')
  @ApiBearerAuth()
  update(
    @Param('feedbackTypeId') feedbackTypeId: string,
    @Body() updateFeedbackTypeDto: UpdateFeedbackTypeDto,
  ) {
    return this.feedbackTypesService.update(
      +feedbackTypeId,
      updateFeedbackTypeDto,
    );
  }

  @Delete(':feedbackTypeId')
  @ApiBearerAuth()
  remove(@Param('feedbackTypeId') feedbackTypeId: string) {
    return this.feedbackTypesService.remove(+feedbackTypeId);
  }
}
