import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    SerializeOptions,
    UseInterceptors,
} from '@nestjs/common';
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { ActionTypesService } from '@modules/action-types/action-types.service';
import { CreateActionTypeDto } from '@modules/action-types/dto/create-action-type.dto';
import { UpdateActionTypeDto } from '@modules/action-types/dto/update-action-type.dto';
import { GROUP_ALL_ACTION_TYPES } from '@modules/action-types/entities/action-type.entity';
import { ExcludeAttributesFromEntity } from '@modules/base.entity';
import { Auth } from '@common/decorators/auth.decorator';

@Auth()
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Good Action Types')
@ApiNotFoundResponse({ description: 'Action type not found' })
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
export class ActionTypesController {
    constructor(private readonly actionTypesService: ActionTypesService) {
    }


    @Get()
    @ApiOkResponse({ description: 'Fetch all action types' })
    @SerializeOptions({
        groups: [GROUP_ALL_ACTION_TYPES],
        excludePrefixes: ExcludeAttributesFromEntity,
    })
    findAll() {
        return this.actionTypesService.findAll();
    }

    @Post()
    @ApiCreatedResponse({ description: 'Create action type request received' })
    @ApiConflictResponse({ description: 'Action type already exist' })
    @SerializeOptions({ excludePrefixes: ExcludeAttributesFromEntity })
    create(@Body() createActionTypeDto: CreateActionTypeDto) {
        return this.actionTypesService.create(createActionTypeDto);
    }

    @Get(':actionTypeId')
    @ApiOkResponse({ description: 'Fetch action type' })
    @SerializeOptions({ excludePrefixes: ExcludeAttributesFromEntity })
    findOne(@Param('actionTypeId') actionTypeId: number) {
        return this.actionTypesService.findOrFail(actionTypeId);
    }

    @Patch(':actionTypeId')
    @ApiOkResponse({ description: 'Action type updated' })
    @ApiConflictResponse({ description: 'Action type already exist' })
    @SerializeOptions({ excludePrefixes: ExcludeAttributesFromEntity })
    async update(
        @Param('actionTypeId') actionTypeId: number,
        @Body() updateActionTypeDto: UpdateActionTypeDto,
    ) {
        await this.actionTypesService.findOrFail(actionTypeId);
        await this.actionTypesService.update(actionTypeId, updateActionTypeDto);
    }

    @Delete(':actionTypeId')
    @ApiOkResponse({ description: 'Action type deleted' })
    async remove(@Param('actionTypeId') actionTypeId: number) {
        await this.actionTypesService.findOrFail(actionTypeId);
        await this.actionTypesService.remove(actionTypeId);
    }
}
