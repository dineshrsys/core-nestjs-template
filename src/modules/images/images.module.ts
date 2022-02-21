import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Image } from '@modules/images/entities/image.entity';
import { ImagesService } from '@modules/images/images.service';
import { ImagesController } from '@modules/images/images.controller';

@Module({
  imports: [SequelizeModule.forFeature([Image])],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
