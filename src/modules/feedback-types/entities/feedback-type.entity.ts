import { AutoIncrement, Column, DataType, DefaultScope, PrimaryKey, Table } from 'sequelize-typescript';

import { BaseEntity, ExcludeAuditColumn } from '@modules/base.entity';
import { Expose, Type } from 'class-transformer';

export const GROUP_FEEDBACK_TYPE = 'group_feedback_type_details';
export const GROUP_ALL_FEEDBACK_TYPES = 'group_all_feedback_type';

@DefaultScope(() => ({
    attributes: ExcludeAuditColumn,
}))
@Table({
    modelName: 'FeedbackType',
    tableName: 'feedback_types',
})
export class FeedbackType extends BaseEntity {
    @Type(() => Number)
    @Expose({ name: 'id' })
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    feedbackTypeId!: number;

    @Expose({
        name: 'name',
        groups: [GROUP_FEEDBACK_TYPE, GROUP_ALL_FEEDBACK_TYPES],
    })
    @Column
    feedbackName!: string;

    @Expose({
        name: 'is_approved',
        groups: [GROUP_ALL_FEEDBACK_TYPES],
    })
    @Column
    isApproved!: boolean;
}
