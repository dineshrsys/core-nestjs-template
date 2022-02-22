import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';

import AuthModule from '@modules/auth/auth.module';
import UsersModule from '@modules/users/users.module';
import { ImagesModule } from '@modules/images/images.module';

const routes: Routes = [
  { path: 'auth', module: AuthModule },
  { path: 'users', module: UsersModule },
  { path: 'images', module: ImagesModule },
];

@Module({
  imports: [
    RouterModule.register(routes),
    AuthModule, UsersModule, ImagesModule,
  ],
})
export default class AppRouteModule {}
