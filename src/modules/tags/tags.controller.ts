import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

import { TagsService } from '@modules/tags/tags.service';
import { CreateTagDto } from '@modules/tags/dto/create-tag.dto';
import { UpdateTagDto } from '@modules/tags/dto/update-tag.dto';

@Controller()
@ApiTags('Tags')
@ApiHeader({ name: 'Tags', description: 'Related to tags' })
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @Post()
  @ApiBearerAuth()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get(':tagId')
  @ApiBearerAuth()
  findOne(@Param('tagId') tagId: string) {
    return this.tagsService.findOne(+tagId);
  }

  @Patch(':tagId')
  @ApiBearerAuth()
  update(@Param('tagId') tagId: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(+tagId, updateTagDto);
  }

  @Delete(':tagId')
  @ApiBearerAuth()
  remove(@Param('tagId') tagId: string) {
    return this.tagsService.remove(+tagId);
  }
}
