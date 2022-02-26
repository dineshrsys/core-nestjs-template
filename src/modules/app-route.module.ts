import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';

import AuthModule from '@modules/auth/auth.module';
import UsersModule from '@modules/users/users.module';
import { ImagesModule } from '@modules/images/images.module';

const Version1Route = [
    {
        path: 'auth',
        module: AuthModule,
    },
    {
        path: 'users',
        module: UsersModule,
    },
    {
        path: 'images',
        module: ImagesModule,
    },
];

const routes: Routes = [
    {
        path: '',
        children: Version1Route,
    },
];

@Module({
    imports: [
        AuthModule,
        UsersModule,
        ImagesModule,
        RouterModule.register(routes),
    ],
})
export default class AppRouteModule {
}
