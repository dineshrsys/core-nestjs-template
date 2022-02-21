import { InjectModel } from '@nestjs/sequelize';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '@modules/categories/entities/category.entity';
import { CreateCategoryDto } from '@modules/categories/dto/create-category.dto';
import { UpdateCategoryDto } from '@modules/categories/dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private readonly categoryRepository: typeof Category,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  findOne(id: number): Promise<Category | null> {
    return this.categoryRepository.findOne({ where: { categoryId: id } });
  }

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.create({ ...createCategoryDto });
  }

  remove(id: number): Promise<number> {
    return this.categoryRepository.destroy({ where: { categoryId: id } });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<[number, Category[]]> {
    return this.categoryRepository.update(updateCategoryDto, { where: { categoryId: id } });
  }

  async findOrFail(id: number): Promise<Category> {
    const foundCategory = await this.categoryRepository.findOne({ where: { categoryId: id } });
    if (!foundCategory) {
      throw new NotFoundException('Category not found');
    }
    return foundCategory;
  }
}
