import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AUTH_JWT_GUARD } from '@constants/common.constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard(AUTH_JWT_GUARD) {}
