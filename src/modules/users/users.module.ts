import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import UsersService from '@modules/users/users.service';
import { User } from '@modules/users/entities/user.entity';
import UsersController from '@modules/users/users.controller';

@Module({
    imports: [SequelizeModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export default class UsersModule {
}
