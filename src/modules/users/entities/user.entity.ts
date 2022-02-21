import { Table, AutoIncrement, PrimaryKey, Unique, Column, ForeignKey, AllowNull, Default } from 'sequelize-typescript';

import { Exclude } from 'class-transformer';
import { BaseEntity } from '@modules/base.entity';
import { Image } from '@modules/images/entities/image.entity';

@Table({ modelName: 'User', tableName: 'users' })
export class User extends BaseEntity {
  @PrimaryKey
  @AutoIncrement
  @Column
  userId!: bigint;

  @AllowNull
  @Column
  firstName!: string;

  @AllowNull
  @Column
  lastName!: string;

  @Unique
  @Column
  email!: string;

  @Exclude({ toPlainOnly: true })
  @AllowNull
  @Column
  password!: string;

  @AllowNull
  @Column
  phone!: string;

  @AllowNull
  @Column
  countryCode!: string;

  @AllowNull
  @ForeignKey(() => Image)
  @Column
  profilePicId!: bigint;

  @AllowNull
  @Column
  fbAuthToken!: string;

  @AllowNull
  @Column
  fbAuthSecret!: string;

  @Default(false)
  @Column
  isEmailVerified!: boolean;

  @Default(false)
  @Column
  isPhoneVerified!: boolean;

  @Default(false)
  @Column
  isTermsPolicyAccepted!: boolean;

  @Default(false)
  @Column
  isAppUser!: boolean;

  @Column
  loginMethod!: string;

  @Column
  currentActAs!: string;
}
