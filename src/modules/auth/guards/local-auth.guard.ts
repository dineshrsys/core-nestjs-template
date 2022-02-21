import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AUTH_LOCAL_GUARD } from '@constants/common.constants';

@Injectable()
export class LocalAuthGuard extends AuthGuard(AUTH_LOCAL_GUARD) {}
