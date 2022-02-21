import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackTypesService } from '@modules/feedback-types/feedback-types.service';

describe('FeedbackTypesService', () => {
  let service: FeedbackTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedbackTypesService],
    }).compile();

    service = module.get<FeedbackTypesService>(FeedbackTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
