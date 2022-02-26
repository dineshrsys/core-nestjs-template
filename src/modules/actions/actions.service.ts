import sequelize = require('sequelize');
import { InjectModel } from '@nestjs/sequelize';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';


import { Actions } from '@modules/actions/entities/action.entity';
import { CreateActionDto } from '@modules/actions/dto/create-action.dto';
import { UpdateActionDto } from '@modules/actions/dto/update-action.dto';


@Injectable()
export class ActionsService {
    constructor(
        @InjectModel(Actions)
        private readonly actionRepository: typeof Actions,
    ) {
    }

    async create(createActionDto: CreateActionDto): Promise<Actions> {
        const isExist = await this.checkName(createActionDto.actionTitle);
        if (isExist) {
            throw new ConflictException('Action already exist');
        }
        return this.actionRepository.create({ ...createActionDto });
    }

    findAll(): Promise<Actions[]> {
        return this.actionRepository.findAll();
    }

    findOne(actionId: number): Promise<Actions | null> {
        return this.actionRepository.findOne({ where: { actionId } });
    }

    remove(actionId: number): Promise<number> {
        return this.actionRepository.destroy({ where: { actionId } });
    }

    async update(actionId: number, updateActionDto: UpdateActionDto): Promise<[number, Actions[]]> {
        if (updateActionDto.actionTitle) {
            const isExist = await this.checkName(updateActionDto.actionTitle);
            if (isExist) {
                throw new ConflictException('Action already exist');
            }
        }
        return this.actionRepository.update(updateActionDto, { where: { actionId } });
    }

    async findOrFail(id: number): Promise<Actions> {
        const actionType = await this.findOne(id);
        if (!actionType) {
            throw new NotFoundException('Action type not found');
        }
        return actionType;
    }

    async checkName(actionTitle: string): Promise<Actions | null> {
        return this.actionRepository.findOne({
            where: {
                actionTitle: sequelize.where(
                    sequelize.fn('LOWER', sequelize.col('action_title')), 'LIKE', `%${actionTitle.toLowerCase()}%`,
                ),
            },
        });
    }
}
