import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import JwtConfigService from '@shared/jwt.config';
import AuthService from '@modules/auth/auth.service';
import UsersModule from '@modules/users/users.module';
import AuthController from '@modules/auth/auth.controller';
import JwtStrategy from '@modules/auth/strategies/jwt-strategy';
import LocalStrategy from '@modules/auth/strategies/local-strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({ useClass: JwtConfigService }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export default class AuthModule {}
