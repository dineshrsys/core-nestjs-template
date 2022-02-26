import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import AuthService from '@modules/auth/auth.service';
import UsersModule from '@modules/users/users.module';
import AuthController from '@modules/auth/auth.controller';
import AuthEntity from '@modules/auth/entities/auth.entity';

import JwtConfig from '@common/configs/jwt-config.service';
import { LocalStrategy } from '@modules/auth/strategies/local.strategy';
import { JwtStrategy } from '@modules/auth/strategies/jwt.strategy';
import JwtAccessStrategy from '@modules/auth/strategies/jwt-access.strategy';
import JwtWSAccessStrategy from '@modules/auth/strategies/jwt-ws-access.strategy';
import JwtRefreshStrategy from '@modules/auth/strategies/jwt-refresh.strategy';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({ useClass: JwtConfig }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
        LocalStrategy,
        JwtAccessStrategy,
        JwtRefreshStrategy,
        JwtWSAccessStrategy,
        AuthEntity,
    ],
})
export default class AuthModule {
}
