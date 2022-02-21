import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  SerializeOptions,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ExcludeAttributesFromEntity } from '@modules/base.entity';
import { CATEGORY_UPDATED } from '@constants/events.constant';
import { CategoriesService } from '@modules/categories/categories.service';
import { UpdateCategoryDto } from '@modules/categories/dto/update-category.dto';
import { CreateCategoryDto } from '@modules/categories/dto/create-category.dto';
import { Category, GROUP_ALL_CATEGORIES, GROUP_CATEGORY } from '@modules/categories/entities/category.entity';

@Controller()
@ApiTags('Categories')
@UseInterceptors(ClassSerializerInterceptor)
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Fetch Categories Request Received' })
  @ApiResponse({ status: 400, description: 'Fetch Categories Request Failed' })
  @SerializeOptions({ groups: [GROUP_ALL_CATEGORIES], excludePrefixes: ExcludeAttributesFromEntity })
  public async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Create Category Request Received' })
  @ApiResponse({ status: 400, description: 'Create Category Request Failed' })
  @SerializeOptions({ groups: [GROUP_CATEGORY], excludePrefixes: ExcludeAttributesFromEntity })
  public async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get(':categoryId')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Fetch Category Request Received' })
  @ApiResponse({ status: 400, description: 'Fetch Category Request Failed' })
  @SerializeOptions({ groups: [GROUP_CATEGORY], excludePrefixes: ExcludeAttributesFromEntity })
  public async findOne(@Param('categoryId', ParseIntPipe) categoryId: number): Promise<Category> {
    return this.categoriesService.findOrFail(categoryId);
  }

  @Patch(':categoryId')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Patch Category Request Received' })
  @ApiResponse({ status: 400, description: 'Patch Category Request Failed' })
  @SerializeOptions({ groups: [GROUP_CATEGORY], excludePrefixes: ExcludeAttributesFromEntity })
  public async update(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    await this.categoriesService.findOrFail(categoryId);
    const [, updatedCategory] = await this.categoriesService.update(categoryId, updateCategoryDto);
    this.eventEmitter.emit(CATEGORY_UPDATED, { payload: updatedCategory });
  }

  @Delete(':categoryId')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Delete Category Request Received' })
  @ApiResponse({ status: 400, description: 'Delete Category Request Failed' })
  public async remove(@Param('categoryId', ParseIntPipe) categoryId: number): Promise<void> {
    await this.categoriesService.findOrFail(categoryId);
    await this.categoriesService.remove(categoryId);
  }
}
