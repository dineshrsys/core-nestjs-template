import { ReasonPhrases } from 'http-status-codes';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { JWT_BEARER } from '@constants/common.constants';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

export const Auth = () => {
    return applyDecorators(
        UseGuards(JwtAuthGuard),
        ApiBearerAuth(JWT_BEARER),
        ApiUnauthorizedResponse({ description: ReasonPhrases.UNAUTHORIZED }),
    );
};
