import {
  Controller, Get, Post, Body, Patch, Param, Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ImagesService } from '@modules/images/images.service';
import { CreateImageDto } from '@modules/images/dto/create-image.dto';
import { UpdateImageDto } from '@modules/images/dto/update-image.dto';

@Controller()
@ApiBearerAuth()
@ApiTags('Images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  create(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':imageId')
  findOne(@Param('imageId') imageId: string) {
    return this.imagesService.findOne(+imageId);
  }

  @Patch(':imageId')
  update(
    @Param('imageId') imageId: string,
    @Body() updateImageDto: UpdateImageDto,
  ) {
    return this.imagesService.update(+imageId, updateImageDto);
  }

  @Delete(':imageId')
  remove(@Param('imageId') imageId: string) {
    return this.imagesService.remove(+imageId);
  }
}
