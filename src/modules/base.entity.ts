import {
  Model, Column, CreatedAt, UpdatedAt, DeletedAt,
} from 'sequelize-typescript';

export const ExcludeAttributesFromEntity = ['dataValues', '_', 'uniqno', 'isNewRecord'];
export const ExcludeAuditColumn = {
  exclude: ['createdAt', 'updatedAt', 'deletedAt', 'createdBy', 'updatedBy', 'createdByIp', 'updatedByIp'],
};
export const ExcludeWithoutCreatedTimeColumn = {
  exclude: ['deletedAt', 'createdBy', 'updatedBy', 'createdByIp', 'updatedByIp'],
};

export class BaseEntity extends Model {
  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @DeletedAt
  deletedAt!: Date;

  @Column({ allowNull: true })
  createdBy!: bigint;

  @Column({ allowNull: true })
  updatedBy!: bigint;

  @Column({ allowNull: true })
  createdByIp!: string;

  @Column({ allowNull: true })
  updatedByIp!: string;
}
