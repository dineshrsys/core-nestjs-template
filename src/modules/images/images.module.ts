import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Image } from '../images/entities/image.entity';
import { ImagesService } from '../images/images.service';
import { ImagesController } from '../images/images.controller';

@Module({
    imports: [SequelizeModule.forFeature([Image])],
    controllers: [ImagesController],
    providers: [ImagesService],
})
export class ImagesModule {
}
