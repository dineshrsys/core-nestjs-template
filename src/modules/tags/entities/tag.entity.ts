import {
    AutoIncrement,
    BeforeBulkUpdate,
    BeforeCreate,
    BeforeUpdate,
    Column,
    DataType,
    DefaultScope,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

import { BaseEntity, ExcludeAuditColumn } from '@modules/base.entity';
import { Expose, Type } from 'class-transformer';
import { toSlug } from '@utils/common.utils';

export const GROUP_ALL_TAG_TYPES = 'group_all_tags';

@DefaultScope(() => ({
    attributes: ExcludeAuditColumn,
}))
@Table({
    modelName: 'Tag',
    tableName: 'tags',
})
export class Tag extends BaseEntity {
    @Type(() => Number)
    @Expose({ name: 'id' })
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    tagId!: number;

    @Expose({ name: 'title' })
    @Column
    tagTitle!: string;

    @Expose({
        name: 'slug',
        groups: [GROUP_ALL_TAG_TYPES],
    })
    @Column
    tagSlug!: string;

    @BeforeCreate
    static beforeCreateHook(instance: Tag) {
        if (instance.tagTitle) {
            instance.tagSlug = toSlug(instance.tagTitle);
        }
    }

    @BeforeUpdate
    static beforeUpdateHook(instance: Tag) {
        if (instance.tagTitle) {
            instance.tagSlug = toSlug(instance.tagTitle);
        }
    }

    @BeforeBulkUpdate
    static hookBeforeCreateSlug(instance: any) {
        if (instance.attributes?.tagTitle) {
            instance.attributes.tagSlug = toSlug(instance.attributes?.tagTitle);
        }
    }
}
