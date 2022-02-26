import { AllowNull, AutoIncrement, BeforeCreate, Column, DataType, DefaultScope, PrimaryKey, Table } from 'sequelize-typescript';
import { Expose, Type } from 'class-transformer';
import { MaxLength } from 'class-validator';

import { toSlug } from '@utils/common.utils';
import { BaseEntity, ExcludeAuditColumn } from '@modules/base.entity';

export const GROUP_ALL_ACTION_TYPES = 'group_all_action_types';

@DefaultScope(() => ({
    attributes: ExcludeAuditColumn,
}))
@Table({
    modelName: 'ActionType',
    tableName: 'action_types',
})
export class ActionType extends BaseEntity {
    @Type(() => Number)
    @Expose({ name: 'id' })
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    actionTypeId!: number;

    @AllowNull(false)
    @Expose({ name: 'name' })
    @Column
    @MaxLength(140)
    actionTypeName!: string;

    @Expose({ name: 'alternative_name' })
    @AllowNull
    @Column
    actionAlternativeName!: string;

    @Expose({
        name: 'slug',
        groups: [GROUP_ALL_ACTION_TYPES],
    })
    @Column
    actionTypeSlug!: string;

    @BeforeCreate
    static beforeCreateHook(instance: ActionType) {
        if (instance.actionTypeName) {
            instance.actionTypeSlug = toSlug(instance.actionTypeName);
        }
    }
}
