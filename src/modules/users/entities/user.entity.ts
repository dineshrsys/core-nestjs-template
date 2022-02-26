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
    Unique,
} from 'sequelize-typescript';
import { Exclude, Expose, Type } from 'class-transformer';
import * as bcrypt from 'bcrypt';

import { BaseEntity, ExcludeAuditColumn } from '@modules/base.entity';
import { Image } from '@modules/images/entities/image.entity';

export const GROUP_USER = 'group_user_details';
export const GROUP_ALL_USER = 'group_all_user';

@DefaultScope(() => ({
    attributes: ExcludeAuditColumn,
    include: {
        model: Image,
        attributes: ExcludeAuditColumn,
    },
}))
@Table({
    modelName: 'User',
    tableName: 'users',
})
export class User extends BaseEntity {
    @Type(() => Number)
    @Expose({ name: 'id' })
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    userId!: number;

    @Expose({ name: 'first_name' })
    @AllowNull
    @Column
    firstName!: string;

    @Expose({ name: 'last_name' })
    @AllowNull
    @Column
    lastName!: string;

    @Expose({ name: 'email' })
    @Unique
    @Column
    email!: string;

    @Exclude({ toPlainOnly: true })
    @AllowNull
    @Column
    password!: string;

    @Expose({ name: 'phone' })
    @AllowNull
    @Column
    phone!: string;

    @Expose({ name: 'country_code' })
    @AllowNull
    @Column
    countryCode!: string;

    @AllowNull
    @Column
    fbAuthToken!: string;

    @AllowNull
    @Column
    fbAuthSecret!: string;

    @Expose({ name: 'is_email_verified' })
    @Default(false)
    @Column
    isEmailVerified!: boolean;

    @Expose({ name: 'is_phone_verified' })
    @Default(false)
    @Column
    isPhoneVerified!: boolean;

    @Default(false)
    @Column
    isTermsPolicyAccepted!: boolean;

    @Expose({ name: 'is_app_user' })
    @Default(false)
    @Column
    isAppUser!: boolean;

    @Column
    loginMethod!: string;
    
    @Column
    currentActAs!: string;

    @Type(() => Number)
    @AllowNull
    @ForeignKey(() => Image)
    @Column(DataType.BIGINT)
    profilePicId!: number;

    @Type(() => Image)
    @Expose({ name: 'profile_image' })
    @BelongsTo(() => Image, 'profilePicId')
    profileImage!: Image;

    @BeforeCreate
    static async beforeCreateHook(user: User) {
        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
        }
    }
}
