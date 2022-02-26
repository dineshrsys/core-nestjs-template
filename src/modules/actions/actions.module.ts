import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ActionsService } from '@modules/actions/actions.service';
import { ActionsController } from '@modules/actions/actions.controller';
import { Actions } from '@modules/actions/entities/action.entity';

@Module({
    imports: [SequelizeModule.forFeature([Actions])],
    controllers: [ActionsController],
    providers: [ActionsService],
})
export class ActionsModule {
}
