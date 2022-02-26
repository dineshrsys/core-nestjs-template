import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedbackTypeDto } from '@modules/feedback-types/dto/create-feedback-type.dto';
import { UpdateFeedbackTypeDto } from '@modules/feedback-types/dto/update-feedback-type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { FeedbackType } from '@modules/feedback-types/entities/feedback-type.entity';

@Injectable()
export class FeedbackTypesService {
    constructor(
        @InjectModel(FeedbackType)
        private readonly feedbackTypeRepository: typeof FeedbackType,
    ) {
    }

    async create(createFeedbackTypeDto: CreateFeedbackTypeDto): Promise<FeedbackType> {
        const isExist = await this.checkName(createFeedbackTypeDto.feedbackName);
        if (isExist) {
            throw new ConflictException('Feedback type already exist');
        }
        return this.feedbackTypeRepository.create({ ...createFeedbackTypeDto });
    }

    findAll(): Promise<FeedbackType[]> {
        return this.feedbackTypeRepository.findAll();
    }

    findOne(feedbackTypeId: number): Promise<FeedbackType | null> {
        return this.feedbackTypeRepository.findOne({ where: { feedbackTypeId } });
    }

    async update(feedbackTypeId: number, updateFeedbackTypeDto: UpdateFeedbackTypeDto):
        Promise<[number, FeedbackType[]]> {
        if (updateFeedbackTypeDto.feedbackName) {
            const isExist = await this.checkName(updateFeedbackTypeDto.feedbackName);
            if (isExist) {
                throw new ConflictException('Feedback type already exist');
            }
        }
        return this.feedbackTypeRepository.update(updateFeedbackTypeDto, { where: { feedbackTypeId } });
    }

    remove(feedbackTypeId: number): Promise<number> {
        return this.feedbackTypeRepository.destroy({ where: { feedbackTypeId } });
    }

    async findOrFail(id: number): Promise<FeedbackType> {
        const foundFeedbackType = await this.findOne(id);
        if (!foundFeedbackType) {
            throw new NotFoundException('Feedback type not found');
        }
        return foundFeedbackType;
    }

    async checkName(feedbackName: string):
        Promise<FeedbackType | null> {
        const feedbackTypes = await this.feedbackTypeRepository.findAll();
        for (const feedbackType of feedbackTypes) {
            if (feedbackType.feedbackName.toLowerCase()===feedbackName.toLowerCase()) {
                return feedbackType;
            }
        }
        return null;
    }
}
