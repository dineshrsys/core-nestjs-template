import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { FeedbackType } from '@modules/feedback-types/entities/feedback-type.entity';
import { FeedbackTypesService } from '@modules/feedback-types/feedback-types.service';
import { FeedbackTypesController } from '@modules/feedback-types/feedback-types.controller';

@Module({
  imports: [SequelizeModule.forFeature([FeedbackType])],
  controllers: [FeedbackTypesController],
  providers: [FeedbackTypesService],
})
export class FeedbackTypesModule {}
