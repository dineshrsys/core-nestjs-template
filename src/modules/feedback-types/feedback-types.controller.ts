import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    SerializeOptions,
    UseInterceptors,
} from '@nestjs/common';
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';

import { FeedbackTypesService } from '@modules/feedback-types/feedback-types.service';
import { CreateFeedbackTypeDto } from '@modules/feedback-types/dto/create-feedback-type.dto';
import { UpdateFeedbackTypeDto } from '@modules/feedback-types/dto/update-feedback-type.dto';
import { ExcludeAttributesFromEntity } from '@modules/base.entity';
import {
    FeedbackType,
    GROUP_ALL_FEEDBACK_TYPES,
    GROUP_FEEDBACK_TYPE,
} from '@modules/feedback-types/entities/feedback-type.entity';
import { Auth } from '@decorators/auth.decorator';

@Auth()
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
@ApiNotFoundResponse({ description: 'Feedback type not found' })
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
@ApiTags('Feedback Option')
export class FeedbackTypesController {
    constructor(private readonly feedbackTypesService: FeedbackTypesService) {
    }

    @Get()
    @ApiOkResponse({ description: 'Fetch all feedback types received' })
    @SerializeOptions({
        groups: [GROUP_ALL_FEEDBACK_TYPES],
        excludePrefixes: ExcludeAttributesFromEntity,
    })
    public async findAll(): Promise<FeedbackType[]> {
        return this.feedbackTypesService.findAll();
    }

    @Post()
    @SerializeOptions({ excludePrefixes: ExcludeAttributesFromEntity })
    @ApiCreatedResponse({ description: 'Create feedback type request received' })
    @ApiConflictResponse({ description: 'Feedback type already exist' })
    public async create(
        @Body() createFeedbackTypeDto: CreateFeedbackTypeDto): Promise<FeedbackType> {
        return this.feedbackTypesService.create(createFeedbackTypeDto);
    }

    @Get(':feedbackTypeId')
    @ApiOkResponse({ description: 'Fetch feedback type request received' })
    @SerializeOptions({
        groups: [GROUP_FEEDBACK_TYPE],
        excludePrefixes: ExcludeAttributesFromEntity,
    })
    public async findOne(@Param('feedbackTypeId', ParseIntPipe) feedbackTypeId: number):
        Promise<FeedbackType | null> {
        return this.feedbackTypesService.findOne(feedbackTypeId);
    }

    @Patch(':feedbackTypeId')
    @ApiOkResponse({ description: 'Feedback type updated' })

    @ApiConflictResponse({ description: 'Feedback type already exist' })
    @SerializeOptions({ excludePrefixes: ExcludeAttributesFromEntity })
    public async update(
        @Param('feedbackTypeId') feedbackTypeId: number,
        @Body() updateFeedbackTypeDto: UpdateFeedbackTypeDto,
    ): Promise<void> {
        await this.feedbackTypesService.update(
            feedbackTypeId,
            updateFeedbackTypeDto,
        );
    }

    @Delete(':feedbackTypeId')
    @ApiOkResponse({ description: 'Feedback type deleted' })
    public async remove(@Param('feedbackTypeId') feedbackTypeId: number):
        Promise<void> {
        await this.feedbackTypesService.remove(feedbackTypeId);
    }
}
