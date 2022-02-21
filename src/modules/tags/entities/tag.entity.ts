import {
  Table, AutoIncrement, PrimaryKey, Column,
} from 'sequelize-typescript';

import { BaseEntity } from '@modules/base.entity';

@Table({ modelName: 'Tag', tableName: 'tags' })
export class Tag extends BaseEntity {
  @PrimaryKey
  @AutoIncrement
  @Column
  tagId!: bigint;

  @Column
  tagTitle!: string;

  @Column
  tagSlug!: string;
}
