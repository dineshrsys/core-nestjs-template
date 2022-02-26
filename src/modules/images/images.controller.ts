import { ApiExcludeController, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';

import { ApiFile } from '@decorators/api-file.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from '@modules/images/images.service';


@Controller()
@ApiTags('Image')
@ApiExcludeController()
@ApiNotFoundResponse({ description: 'Not Found' })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {
        //TODO::
    }

    @Post()
    @ApiFile('file')
    @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
    upload(
        @UploadedFile() file: Express.Multer.File,
        @Query('type') type: string,
        @Query('isMultiple') isMultiple: boolean,
    ) {
        return {
            file,
            type,
            isMultiple,
        };
    }

    @Get(':imageId')
    findOne(@Param('imageId') imageId: number) {
        //TODO::
    }

    @Patch(':imageId')
    @ApiFile('file')
    @UseInterceptors(FileInterceptor('file'))
    update(
        @Param('imageId') imageId: number,
        @UploadedFile() file: Express.Multer.File,
    ) {
        //TODO::
    }

    @Delete(':imageId')
    remove(@Param('imageId') imageId: number) {
        //TODO::
    }
}
