import {
  Table, AutoIncrement, PrimaryKey, Column,
} from 'sequelize-typescript';

import { BaseEntity } from '@modules/base.entity';

@Table({ modelName: 'FeedbackType', tableName: 'feedback_types' })
export class FeedbackType extends BaseEntity {
  @PrimaryKey
  @AutoIncrement
  @Column
  feedbackTypeId!: bigint;

  @Column
  feedbackTypeName!: string;

  @Column
  feedbackTypeSlug!: string;
}
