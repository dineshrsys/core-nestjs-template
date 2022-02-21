import {
  Table,
  AutoIncrement,
  PrimaryKey,
  Column,
  ForeignKey,
  DataType,
  AllowNull,
  Default,
  BeforeCreate,
  BeforeBulkUpdate,
  BelongsTo,
  DefaultScope,
} from 'sequelize-typescript';
import { Exclude, Expose, Type } from 'class-transformer';

import { toSlug } from '@utils/common.utils';
import { Image } from '@modules/images/entities/image.entity';
import { BaseEntity, ExcludeAuditColumn } from '@modules/base.entity';

export const GROUP_CATEGORY = 'group_category_details';
export const GROUP_ALL_CATEGORIES = 'group_all_category';

@DefaultScope(() => ({
  order: ['createdAt'],
  attributes: ExcludeAuditColumn,
  include: { model: Image, attributes: ExcludeAuditColumn },
}))
@Table({ modelName: 'Category', tableName: 'categories' })
export class Category extends BaseEntity {
  @Type(() => Number)
  @Expose({ name: 'id' })
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.BIGINT)
  categoryId!: bigint;

  @Expose({ name: 'title' })
  @Column
  categoryTitle!: string;

  @Expose({ name: 'slug', groups: [GROUP_CATEGORY, GROUP_ALL_CATEGORIES] })
  @Column
  categorySlug!: string;

  @Expose({ name: 'description', groups: [GROUP_CATEGORY, GROUP_ALL_CATEGORIES] })
  @AllowNull
  @Column(DataType.TEXT)
  categoryDescription!: string;

  @Expose({ name: 'is_approved', groups: [GROUP_CATEGORY, GROUP_ALL_CATEGORIES] })
  @Default(false)
  @Column
  isApproved!: boolean;

  @Type(() => Number)
  @Exclude({ toPlainOnly: true })
  @ForeignKey(() => Image)
  @AllowNull
  @Column(DataType.BIGINT)
  iconId!: bigint;

  @Type(() => Image)
  @Expose({ name: 'image' })
  @BelongsTo(() => Image, 'iconId')
  icon!: Image;

  @BeforeCreate
  static beforeCreateHook(instance: Category) {
    if (instance.categoryTitle) {
      instance.categorySlug = toSlug(instance.categoryTitle);
    }
  }

  @BeforeCreate
  static beforeUpdateHook(instance: Category) {
    if (instance.categoryTitle) {
      instance.categorySlug = toSlug(instance.categoryTitle);
    }
  }

  @BeforeBulkUpdate
  static hookBeforeCreateSlug(instance: any) {
    if (instance.attributes?.categoryTitle) {
      instance.attributes.categorySlug = toSlug(instance.attributes?.categoryTitle);
    }
  }
}
