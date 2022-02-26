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

import { TagsService } from '@modules/tags/tags.service';
import { GROUP_ALL_TAG_TYPES, Tag } from '@modules/tags/entities/tag.entity';
import { CreateTagDto } from '@modules/tags/dto/create-tag.dto';
import { UpdateTagDto } from '@modules/tags/dto/update-tag.dto';
import { ExcludeAttributesFromEntity } from '@modules/base.entity';
import { Auth } from '@decorators/auth.decorator';

@Auth()
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Tag')
@ApiNotFoundResponse({ description: 'Tag not found' })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
export class TagsController {
    constructor(private readonly tagsService: TagsService) {
    }

    @Get()
    @ApiOkResponse({ description: 'Fetch all tags request received' })
    @ApiNotFoundResponse({ description: 'No tag found' })
    @SerializeOptions({
        groups: [GROUP_ALL_TAG_TYPES],
        excludePrefixes: ExcludeAttributesFromEntity,
    })
    public async findAll(): Promise<Tag[]> {
        return this.tagsService.findAll();
    }

    @Post()
    @ApiCreatedResponse({ description: 'Create tag request received' })
    @ApiConflictResponse({ description: 'Tag already exist' })
    @SerializeOptions({ excludePrefixes: ExcludeAttributesFromEntity })
    public async create(@Body() createTagDto: CreateTagDto): Promise<Tag> {
        return this.tagsService.create(createTagDto);
    }

    @Get(':tagId')
    @ApiOkResponse({ description: 'Fetch tag request received' })
    @SerializeOptions({ excludePrefixes: ExcludeAttributesFromEntity })
    public async findOne(@Param('tagId', ParseIntPipe) tagId: number): Promise<Tag> {
        return this.tagsService.findOrFail(tagId);
    }

    @Patch(':tagId')
    @ApiOkResponse({ description: 'Tag updated' })
    @ApiConflictResponse({ description: 'Tag name already exist' })
    @SerializeOptions({ excludePrefixes: ExcludeAttributesFromEntity })
    public async update(@Param('tagId', ParseIntPipe) tagId: number, @Body() updateTagDto: UpdateTagDto):
        Promise<void> {
        await this.tagsService.findOrFail(tagId);
        await this.tagsService.update(tagId, updateTagDto);
    }

    @Delete(':tagId')
    @ApiOkResponse({ description: 'Tag deleted' })
    public async remove(@Param('tagId', ParseIntPipe) tagId: number): Promise<void> {
        await this.tagsService.findOrFail(tagId);
        await this.tagsService.remove(tagId);
    }
}
