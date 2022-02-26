import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ActionType } from '@modules/action-types/entities/action-type.entity';
import { ActionTypesService } from '@modules/action-types/action-types.service';
import { ActionTypesController } from '@modules/action-types/action-types.controller';

@Module({
    imports: [SequelizeModule.forFeature([ActionType])],
    controllers: [ActionTypesController],
    providers: [ActionTypesService],
})
export class ActionTypesModule {
}
