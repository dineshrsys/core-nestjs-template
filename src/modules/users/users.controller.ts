import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

@ApiTags('Users')
@ApiBearerAuth()
@Controller()
export default class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers(): string {
    return 'users';
  }
}
