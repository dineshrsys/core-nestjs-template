import {
    AllowNull,
    AutoIncrement,
    BeforeBulkUpdate,
    BeforeCreate,
    BeforeUpdate,
    BelongsTo,
    Column,
    DataType,
    Default,
    DefaultScope,
    ForeignKey,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import { Exclude, Expose, Type } from 'class-transformer';

import { toSlug } from '@utils/common.utils';
import { Image } from '@modules/images/entities/image.entity';
import { BaseEntity, ExcludeAuditColumn } from '@modules/base.entity';

export const GROUP_CATEGORY = 'group_category_details';
export const GROUP_ALL_CATEGORIES = 'group_all_category';

@DefaultScope(() => ({
    attributes: ExcludeAuditColumn,
    include: {
        model: Image,
        attributes: ExcludeAuditColumn,
    },
}))
@Table({
    modelName: 'Category',
    tableName: 'categories',
})
export class Category extends BaseEntity {
    @Type(() => Number)
    @Expose({ name: 'id' })
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    categoryId!: number;

    @Expose({ name: 'title' })
    @Column
    categoryTitle!: string;

    @Expose({
        name: 'slug',
        groups: [GROUP_ALL_CATEGORIES],
    })
    @Column
    categorySlug!: string;

    @Expose({
        name: 'description',
        groups: [GROUP_CATEGORY, GROUP_ALL_CATEGORIES],
    })
    @AllowNull
    @Column(DataType.TEXT)
    categoryDescription!: string;

    @Expose({
        name: 'is_approved',
        groups: [GROUP_CATEGORY, GROUP_ALL_CATEGORIES],
    })
    @Default(false)
    @Column
    isApproved!: boolean;

    @AllowNull
    @Type(() => Number)
    @Exclude({ toPlainOnly: true })
    @ForeignKey(() => Image)
    @Column(DataType.BIGINT)
    iconId!: number;

    @Type(() => Image)
    @Expose({ name: 'image' })
    @BelongsTo(() => Image, 'iconId')
    icon!: Image;

    @BeforeCreate
    static beforeCreateHook(category: Category) {
        if (category.categoryTitle) {
            category.categorySlug = toSlug(category.categoryTitle);
        }
    }

    @BeforeUpdate
    static beforeUpdateHook(category: Category) {
        if (category.categoryTitle) {
            category.categorySlug = toSlug(category.categoryTitle);
        }
    }

    @BeforeBulkUpdate
    static hookBeforeCreateSlug(category: any) {
        if (category.attributes?.categoryTitle) {
            category.attributes.categorySlug = toSlug(category.attributes?.categoryTitle);
        }
    }
}
