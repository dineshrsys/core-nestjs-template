import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  Body, Controller, Get, Post, UseGuards,
} from '@nestjs/common';

import ResponseUtils from '@utils/response.utils';
import { SuccessResponseInterface } from '@interfaces/success-response.interface';

import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { UserRegisterRequestDto } from './dto/user-register-request.dto';

@ApiTags('Auth')
@Controller()
export default class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOkResponse()
  async login(
    @Body() userLoginRequestDto: UserLoginRequestDto,
  ): Promise<SuccessResponseInterface> {
    return ResponseUtils.success('', userLoginRequestDto);
  }

  @Post('register')
  @ApiOkResponse()
  async register(
    @Body() createUserDto: UserRegisterRequestDto,
  ): Promise<SuccessResponseInterface> {
    return ResponseUtils.success('', createUserDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @Post('refresh-token')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<SuccessResponseInterface> {
    return ResponseUtils.success('', refreshTokenDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @Get('me')
  async me(): Promise<SuccessResponseInterface> {
    return ResponseUtils.success('', {});
  }
}
