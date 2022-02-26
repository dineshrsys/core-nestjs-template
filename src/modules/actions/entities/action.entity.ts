import {
    AllowNull,
    AutoIncrement,
    BeforeCreate,
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
import { MaxLength } from 'class-validator';

import { toSlug } from '@utils/common.utils';
import { Image } from '@modules/images/entities/image.entity';
import { BaseEntity, ExcludeAuditColumn } from '@modules/base.entity';
import { VISIBLE_TO_ENTITY_ENUM } from '@constants/events.constant';
import { ActionType } from '@modules/action-types/entities/action-type.entity';

export const GROUP_ALL_ACTIONS = 'group_all_actions';

@DefaultScope(() => ({
    attributes: ExcludeAuditColumn,
    include: [
        {
            model: Image,
            attributes: ExcludeAuditColumn,
        },
        {
            model: ActionType,
            attributes: ExcludeAuditColumn,
        },
    ],
}))
@Table({
    modelName: 'Actions',
    tableName: 'actions',
})
export class Actions extends BaseEntity {
    @Type(() => Number)
    @Expose({ name: 'id' })
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    actionId!: number;

    @Type(() => Number)
    @Exclude({ toPlainOnly: true })
    @ForeignKey(() => ActionType)
    @Column(DataType.BIGINT)
    actionTypeId!: number;

    @Type(() => ActionType)
    @Expose({ name: 'action_type' })
    @BelongsTo(() => ActionType, 'actionTypeId')
    actionType!: ActionType;

    @Expose({ name: 'title' })
    @Column
    @MaxLength(140)
    actionTitle!: string;

    @Expose({
        name: 'slug',
        groups: [GROUP_ALL_ACTIONS],
    })
    @Column
    actionSlug!: string;

    @Expose({ name: 'description' })
    @AllowNull
    @Column(DataType.TEXT)
    actionDescription!: string;

    @AllowNull
    @Type(() => Number)
    @Exclude({ toPlainOnly: true })
    @ForeignKey(() => Image)
    @Column(DataType.BIGINT)
    actionIconId!: number;

    @Type(() => Image)
    @Expose({ name: 'image' })
    @BelongsTo(() => Image, 'actionIconId')
    icon!: Image;

    @Column(DataType.ENUM('User', 'Organization'))
    @Expose({ name: 'visible_to' })
    visibleToEntity!: VISIBLE_TO_ENTITY_ENUM;

    @Default(false)
    @Expose({ name: 'is_approved' })
    @Column
    isApproved!: boolean;

    @BeforeCreate
    static beforeCreateHook(instance: Actions) {
        if (instance.actionTitle) {
            instance.actionSlug = toSlug(instance.actionTitle);
        }
    }
}
