import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Category } from '@modules/categories/entities/category.entity';
import { CategoriesService } from '@modules/categories/categories.service';
import { CategoriesController } from '@modules/categories/categories.controller';

@Module({
    imports: [SequelizeModule.forFeature([Category])],
    controllers: [CategoriesController],
    providers: [CategoriesService],
})
export class CategoriesModule {
}
