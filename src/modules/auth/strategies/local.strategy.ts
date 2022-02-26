import { Request as ExpressRequest } from 'express';
import { Strategy } from 'passport-local';

import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import AuthService from '@modules/auth/auth.service';
import { UserLoginDto } from '@modules/auth/dto/user-login.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        });
    }

    async validate(payload: ExpressRequest, username: string, password: string): Promise<any> {
        const userLoginDto = plainToClass(UserLoginDto, payload.body);

        const errors = await validate(userLoginDto);
        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }

        const validatedUser = await this.authService.validateUser(username, password, userLoginDto.isSocial);
        if (!validatedUser) {
            throw new UnauthorizedException('Invalid user credentials');
        }

        return validatedUser;
    }
}
