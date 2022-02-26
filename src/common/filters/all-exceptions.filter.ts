import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';

import { Response as ExpressResponse } from 'express';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ExceptionResponse } from '@interfaces/exception-response.interface';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx: HttpArgumentsHost = host.switchToHttp();
        const res = ctx.getResponse<ExpressResponse>();

        const errors: null | ExceptionResponse = exception.getResponse
            ? (exception.getResponse() as ExceptionResponse)
            :null;

        Logger.error(exception);

        return res
            .status(exception.getStatus ? exception.getStatus():HttpStatus.INTERNAL_SERVER_ERROR)
            .json(errors);
    }
}
