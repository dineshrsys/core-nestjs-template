import sequelize = require('sequelize');
import { InjectModel } from '@nestjs/sequelize';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { ActionType } from '@modules/action-types/entities/action-type.entity';
import { CreateActionTypeDto } from '@modules/action-types/dto/create-action-type.dto';
import { UpdateActionTypeDto } from '@modules/action-types/dto/update-action-type.dto';

@Injectable()
export class ActionTypesService {
    constructor(
        @InjectModel(ActionType)
        private readonly actionTypeRepository: typeof ActionType,
    ) {
    }

    async create(createActionTypeDto: CreateActionTypeDto): Promise<ActionType> {
        const isExist = await this.checkName(createActionTypeDto.actionTypeName);
        if (isExist) {
            throw new ConflictException('Action type already exist');
        }

        return this.actionTypeRepository.create({ ...createActionTypeDto });
    }

    findAll(): Promise<ActionType[]> {
        return this.actionTypeRepository.findAll();
    }

    findOne(actionTypeId: number): Promise<ActionType | null> {
        return this.actionTypeRepository.findOne({ where: { actionTypeId } });
    }

    remove(actionTypeId: number): Promise<number> {
        return this.actionTypeRepository.destroy({ where: { actionTypeId } });
    }

    async findOrFail(actionTypeId: number): Promise<ActionType> {
        const actionType = await this.findOne(actionTypeId);
        if (!actionType) {
            throw new NotFoundException('Action type not found');
        }
        return actionType;
    }

    async update(actionTypeId: number, updateActionTypeDto: UpdateActionTypeDto): Promise<[number, ActionType[]]> {
        if (updateActionTypeDto.actionTypeName) {
            const isExist = await this.checkName(updateActionTypeDto.actionTypeName);
            if (isExist) {
                throw new ConflictException('Action type already exist');
            }
        }
        return this.actionTypeRepository.update(updateActionTypeDto, { where: { actionTypeId } });
    }

    async checkName(Name: string): Promise<ActionType | null> {
        return this.actionTypeRepository.findOne({
            where: {
                actionTypeName: sequelize.where(sequelize.fn('LOWER', sequelize.col('action_type_name')),
                    'LIKE', `%${Name.toLowerCase()}%`),
            },
        });
    }
}
