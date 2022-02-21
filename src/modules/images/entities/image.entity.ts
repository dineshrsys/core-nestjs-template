import {
  Table, AutoIncrement, PrimaryKey, Column, AllowNull, DefaultScope,
} from 'sequelize-typescript';
import { Expose, Type } from 'class-transformer';

import { toBucketUrl } from '@utils/common.utils';
import { BaseEntity, ExcludeAuditColumn } from '@modules/base.entity';

export const GROUP_IMAGE = 'group_image_details';
export const GROUP_ALL_IMAGES = 'group_all_images';

@DefaultScope(() => ({
  order: ['createdAt'],
  attributes: ExcludeAuditColumn,
}))
@Table({ modelName: 'Image', tableName: 'images' })
export class Image extends BaseEntity {
  @Type(() => Number)
  @Expose({ name: 'id' })
  @AutoIncrement
  @PrimaryKey
  @Column
  imageId!: bigint;

  @Expose({ name: 'name', groups: [GROUP_IMAGE, GROUP_ALL_IMAGES] })
  @AllowNull
  @Column
  imageName!: string;

  @Expose({ name: 'size', groups: [GROUP_IMAGE, GROUP_ALL_IMAGES] })
  @AllowNull
  @Column
  imageSize!: string;

  @Expose({ name: 'mime', groups: [GROUP_IMAGE, GROUP_ALL_IMAGES] })
  @AllowNull
  @Column
  imageMime!: string;

  @Expose({ name: 'storage_key', groups: [GROUP_IMAGE, GROUP_ALL_IMAGES] })
  @Column
  imageStorageKey!: string;

  @Expose({ name: 'image_path' })
  get getBucketUrl() {
    return this.imageStorageKey ? toBucketUrl(this.imageStorageKey) : null;
  }
}
