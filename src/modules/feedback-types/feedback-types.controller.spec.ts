import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackTypesController } from '@modules/feedback-types/feedback-types.controller';
import { FeedbackTypesService } from '@modules/feedback-types/feedback-types.service';

describe('FeedbackTypesController', () => {
  let controller: FeedbackTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackTypesController],
      providers: [FeedbackTypesService],
    }).compile();

    controller = module.get<FeedbackTypesController>(FeedbackTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
