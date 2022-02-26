import sequelize = require('sequelize');
import { InjectModel } from '@nestjs/sequelize';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateTagDto } from '@modules/tags/dto/create-tag.dto';
import { UpdateTagDto } from '@modules/tags/dto/update-tag.dto';
import { Tag } from '@modules/tags/entities/tag.entity';

@Injectable()
export class TagsService {
    constructor(
        @InjectModel(Tag)
        private readonly tagRepository: typeof Tag,
    ) {
    }

    async create(createTagDto: CreateTagDto): Promise<Tag> {
        const tag = await this.checkTitle(createTagDto);
        if (tag) {
            throw new ConflictException('Tag already exist');
        }
        return this.tagRepository.create({ ...createTagDto });
    }

    findAll(): Promise<Tag[]> {
        return this.tagRepository.findAll();
    }

    findOne(tagId: number): Promise<Tag | null> {
        return this.tagRepository.findOne({ where: { tagId } });
    }

    async update(tagId: number, updateTagDto: UpdateTagDto): Promise<[number, Tag[]]> {
        const tag = await this.checkTitle(updateTagDto);
        if (tag) {
            throw new ConflictException('Tag name already exist');
        }
        return this.tagRepository.update(updateTagDto, { where: { tagId } });
    }

    remove(tagId: number): Promise<number> {
        return this.tagRepository.destroy({ where: { tagId } });
    }

    async findOrFail(id: number): Promise<Tag> {
        const foundTag = await this.findOne(id);
        if (!foundTag) {
            throw new NotFoundException('Tag not found');
        }
        return foundTag;
    }

    async checkTitle({ tagTitle }: CreateTagDto): Promise<Tag | null> {
        const tags = await this.tagRepository.findOne({
            where: {
                tagTitle: sequelize.where(sequelize.fn('LOWER', sequelize.col('tag_title')),
                    'LIKE', `%${tagTitle.toLowerCase()}%`),
            },
        });
        return tags;
    }
}
