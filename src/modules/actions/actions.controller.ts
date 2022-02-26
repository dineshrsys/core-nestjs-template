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
import { ActionsService } from '@modules/actions/actions.service';
import { ExcludeAttributesFromEntity } from '@modules/base.entity';
import { CreateActionDto } from '@modules/actions/dto/create-action.dto';
import { UpdateActionDto } from '@modules/actions/dto/update-action.dto';
import { Actions, GROUP_ALL_ACTIONS } from '@modules/actions/entities/action.entity';
import { Auth } from '@decorators/auth.decorator';

@Auth()
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Good Action')
@ApiNotFoundResponse({ description: 'Action not found' })
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
export class ActionsController {
    constructor(private readonly actionsService: ActionsService) {
    }

    @Get()
    @ApiOkResponse({ description: 'Fetch all actions received' })
    @ApiNotFoundResponse({ description: 'No action found' })
    @SerializeOptions({
        groups: [GROUP_ALL_ACTIONS],
        excludePrefixes: ExcludeAttributesFromEntity,
    })
    findAll(): Promise<Actions[]> {
        return this.actionsService.findAll();
    }

    @Post()
    @SerializeOptions({ excludePrefixes: ExcludeAttributesFromEntity })
    @ApiCreatedResponse({ description: 'Create action request received' })
    @ApiConflictResponse({ description: 'Action already exist' })
    create(@Body() createActionDto: CreateActionDto): Promise<Actions> {
        return this.actionsService.create(createActionDto);
    }

    @Get(':actionId')
    @SerializeOptions({ excludePrefixes: ExcludeAttributesFromEntity })
    findOne(@Param('actionId') actionId: number): Promise<Actions> {
        return this.actionsService.findOrFail(actionId);
    }

    @Patch(':actionId')
    @SerializeOptions({ excludePrefixes: ExcludeAttributesFromEntity })
    @ApiOkResponse({ description: 'Action updated' })
    @ApiConflictResponse({ description: 'Action already exist' })
    async update(@Param('actionId') actionId: number, @Body() updateActionDto: UpdateActionDto): Promise<void> {
        await this.actionsService.findOrFail(actionId);
        await this.actionsService.update(actionId, updateActionDto);
    }

    @Delete(':actionId')
    @ApiOkResponse({ description: 'Action deleted' })
    async remove(@Param('actionId') actionId: number): Promise<void> {
        await this.actionsService.findOrFail(actionId);
        await this.actionsService.remove(actionId);
    }
}
