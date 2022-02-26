import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    SerializeOptions,
    UseInterceptors,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';

import { CATEGORY_UPDATED } from '@constants/events.constant';
import { ExcludeAttributesFromEntity } from '@modules/base.entity';
import { CategoriesService } from '@modules/categories/categories.service';
import { UpdateCategoryDto } from '@modules/categories/dto/update-category.dto';
import { CreateCategoryDto } from '@modules/categories/dto/create-category.dto';
import { Category, GROUP_ALL_CATEGORIES, GROUP_CATEGORY } from '@modules/categories/entities/category.entity';
import { Auth } from '@decorators/auth.decorator';


@Controller()
@UseInterceptors(ClassSerializerInterceptor)
@Auth()
@ApiTags('Category')
@ApiNotFoundResponse({ description: 'Not Found' })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService,
        private readonly eventEmitter: EventEmitter2) {
    }

    @Get()
    @ApiOkResponse({ description: 'Fetch Categories Request Received' })
    @ApiBadRequestResponse({ description: 'Fetch Categories Request Failed' })
    @SerializeOptions({
        groups: [GROUP_ALL_CATEGORIES],
        excludePrefixes: ExcludeAttributesFromEntity,
    })
    public async findAll(): Promise<Category[]> {
        return this.categoriesService.findAll();
    }

    @Post()
    @ApiCreatedResponse({ description: 'Create Category Request Received' })
    @ApiBadRequestResponse({ description: 'Create Category Request Failed' })
    @SerializeOptions({
        groups: [GROUP_CATEGORY],
        excludePrefixes: ExcludeAttributesFromEntity,
    })
    public async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoriesService.create(createCategoryDto);
    }

    @Get(':categoryId')
    @ApiOkResponse({ description: 'Fetch Categories Request Received' })
    @ApiBadRequestResponse({ description: 'Fetch Categories Request Failed' })
    @SerializeOptions({
        groups: [GROUP_CATEGORY],
        excludePrefixes: ExcludeAttributesFromEntity,
    })
    public async findOne(@Param('categoryId') categoryId: number): Promise<Category> {
        return this.categoriesService.findOrFail(categoryId);
    }

    @Patch(':categoryId')
    @ApiOkResponse({ description: 'Patch Categories Request Received' })
    @ApiBadRequestResponse({ description: 'Patch Categories Request Failed' })
    @SerializeOptions({
        groups: [GROUP_CATEGORY],
        excludePrefixes: ExcludeAttributesFromEntity,
    })
    public async update(
        @Param('categoryId') categoryId: number,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ): Promise<void> {
        await this.categoriesService.findOrFail(categoryId);
        const [, updatedCategory] = await this.categoriesService.update(categoryId, updateCategoryDto);
        this.eventEmitter.emit(CATEGORY_UPDATED, { payload: updatedCategory });
    }

    @Delete(':categoryId')
    @ApiOkResponse({ description: 'Delete Categories Request Received' })
    @ApiBadRequestResponse({ description: 'Delete Categories Request Failed' })
    public async remove(@Param('categoryId') categoryId: number): Promise<void> {
        await this.categoriesService.findOrFail(categoryId);
        await this.categoriesService.remove(categoryId);
    }
}
