import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';

import AuthModule from '@modules/auth/auth.module';
import UsersModule from '@modules/users/users.module';
import { TagsModule } from '@modules/tags/tags.module';
import { ImagesModule } from '@modules/images/images.module';
import { CategoriesModule } from '@modules/categories/categories.module';
import { FeedbackTypesModule } from '@modules/feedback-types/feedback-types.module';

const routes: Routes = [
  { path: 'auth', module: AuthModule },
  { path: 'tags', module: TagsModule },
  { path: 'users', module: UsersModule },
  { path: 'images', module: ImagesModule },
  { path: 'categories', module: CategoriesModule },
  { path: 'feedback-types', module: FeedbackTypesModule },
];

@Module({
  imports: [
    RouterModule.register(routes),
    AuthModule, UsersModule, CategoriesModule, ImagesModule, FeedbackTypesModule, TagsModule,
  ],
})
export default class AppRouteModule {}
