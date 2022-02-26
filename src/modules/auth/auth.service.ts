import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import UsersService from '@modules/users/users.service';
import { UserRegisterDto } from '@modules/auth/dto/user-register.dto';
import { LoginPayload } from '@modules/auth/interfaces/login-payload.interface';
import AuthEntity from '@modules/auth/entities/auth.entity';
import { RefreshTokenDto } from '@modules/auth/dto/refresh-token.dto';
import JwtTokensDto from '@modules/auth/dto/jwt-tokens.dto';
import { DecodedUser } from './interfaces/decoded-user.interface';
import { User } from '@modules/users/entities/user.entity';
import { UserExistsException } from '@exceptions/user-exists-exception';
import ResetPasswordDto from './dto/reset-password.dto';

@Injectable()
export default class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
        private authRepository: AuthEntity,
        private eventEmitter: EventEmitter2,
        private configService: ConfigService,
    ) {
        // TODO::
    }

    private createAccessToken(payload: LoginPayload): string {
        return this.jwtService.sign(payload, {
            expiresIn: this.configService.get('JWT_ACCESS_DURATION'),
            secret: this.configService.get('JWT_SECRET'),
        });
    }

    private createRefreshToken(payload: LoginPayload): string {
        return this.jwtService.sign(payload, {
            expiresIn: this.configService.get('JWT_REFRESH_DURATION'),
            secret: this.configService.get('JWT_SECRET'),
        });
    }

    createVerificationAccessToken(payload: LoginPayload): string {
        return this.jwtService.sign(payload, {
            expiresIn: this.configService.get('JWT_VERIFICATION_ACCESS_DURATION'),
            secret: this.configService.get('JWT_SECRET'),
        });
    }

    async validateUser(username: string, pass: string, isSocial: boolean): Promise<User | null> {
        const foundUser = await this.usersService.findOneByEmail(username);
        if (foundUser) {
            if (isSocial) {
                return foundUser;
            }

            const passwordCompared = await bcrypt.compare(pass, foundUser.password);
            if (passwordCompared) {
                return foundUser;
            }
        }
        return null;
    }

    async getDecodedUser({ refreshToken }: RefreshTokenDto): Promise<any> {
        return this.jwtService.decode(refreshToken);
    }

    getRefreshTokenByEmail(email: string): Promise<string | null> {
        return this.authRepository.getToken(email);
    }

    deleteTokenByEmail(email: string): Promise<number> {
        return this.authRepository.removeToken(email);
    }

    deleteAllTokens(): Promise<string> {
        return this.authRepository.removeAllTokens();
    }

    async verifyToken(token: string, secret: string): Promise<DecodedUser | null> {
        try {
            return (await this.jwtService.verifyAsync(token, {
                secret,
            })) as DecodedUser | null;
        } catch (error) {
            return null;
        }
    }

    async login(loginDto: LoginPayload): Promise<JwtTokensDto> {
        const payload: LoginPayload = {
            id: loginDto.id,
            email: loginDto.email,
        };

        const accessToken = this.createAccessToken(payload);
        const refreshToken = this.createRefreshToken(payload);
        await this.authRepository.addRefreshToken(payload.email as string, refreshToken);

        return {
            accessToken,
            refreshToken,
        };
    }

    async create(registerDto: UserRegisterDto): Promise<any> {
        const foundUser = await this.usersService.findOneByEmail(registerDto.email);
        if (foundUser) {
            if (registerDto.isSocial) {
                return foundUser;
            }
            throw new UserExistsException();
        }

        const createdUser = this.usersService.create({
            ...registerDto,
            isAppUser: true,
            isEmailVerified: registerDto.isSocial,
        });
        if (!createdUser) {
            throw new InternalServerErrorException('User registration is unsuccessful');
        }
        return createdUser;
    }

    async updatePassword(resetPasswordDto: ResetPasswordDto): Promise<any> {
        const foundUser = await this.usersService.findOneByEmail(resetPasswordDto.email);

        if (!foundUser) {
            throw new NotFoundException(`The user does not exist with this email ${resetPasswordDto.email}`);
        }

        if (resetPasswordDto.password !== resetPasswordDto.confirmPassword) {
            Logger.error(`Password does not match of ${resetPasswordDto.email}`);
            throw new BadRequestException('Password does not match with confirm password!');
        }

        return this.usersService.updatePassword(foundUser.userId, resetPasswordDto.password);
    }
}
