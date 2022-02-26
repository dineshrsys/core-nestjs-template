import { ApiBearerAuth, ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

@ApiTags('User')
@ApiBearerAuth()
@ApiExcludeController()
@Controller()
export default class UsersController {
    @Get()
    @UseGuards(JwtAuthGuard)
    getUsers(): string {
        return 'users';
    }
}
