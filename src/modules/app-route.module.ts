import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';

import AuthModule from '@modules/auth/auth.module';
import UsersModule from '@modules/users/users.module';
import { TagsModule } from '@modules/tags/tags.module';
import { ImagesModule } from '@modules/images/images.module';
import { ActionsModule } from '@modules/actions/actions.module';
import { CategoriesModule } from '@modules/categories/categories.module';
import { ActionTypesModule } from '@modules/action-types/action-types.module';
import { FeedbackTypesModule } from '@modules/feedback-types/feedback-types.module';

const Version1Route = [
    {
        path: 'auth',
        module: AuthModule,
    },
    {
        path: 'tags',
        module: TagsModule,
    },
    {
        path: 'users',
        module: UsersModule,
    },
    {
        path: 'images',
        module: ImagesModule,
    },
    {
        path: 'actions',
        module: ActionsModule,
    },
    {
        path: 'categories',
        module: CategoriesModule,
    },
    {
        path: 'action-types',
        module: ActionTypesModule,
    },
    {
        path: 'feedback-types',
        module: FeedbackTypesModule,
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
        CategoriesModule,
        TagsModule,
        ImagesModule,
        ActionsModule,
        ActionTypesModule,
        FeedbackTypesModule,
        RouterModule.register(routes),
    ],
})
export default class AppRouteModule {
}
