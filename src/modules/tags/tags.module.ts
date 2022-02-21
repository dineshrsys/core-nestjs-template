import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Tag } from '@modules/tags/entities/tag.entity';
import { TagsService } from '@modules/tags/tags.service';
import { TagsController } from '@modules/tags/tags.controller';

@Module({
  imports: [SequelizeModule.forFeature([Tag])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
