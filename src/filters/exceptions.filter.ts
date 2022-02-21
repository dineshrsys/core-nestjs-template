import {
  Catch,
  HttpStatus,
  ArgumentsHost,
  ExceptionFilter,
  Logger,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

import { DATABASE_ERROR_CODE } from '@constants/db-error-code.constants';
import { ExceptionResponse } from '@interfaces/exception-response.interface';

@Catch()
export default class ExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const res = ctx.getResponse<ExpressResponse>();

    const message: string | null = exception.message || null;
    const errors: null | ExceptionResponse = exception.getResponse
      ? (exception.getResponse() as ExceptionResponse)
      : null;

    const status: number = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    Logger.error(exception.stack);

    if (exception.code in DATABASE_ERROR_CODE) {
      return res.status(HttpStatus.CONFLICT).json({ message, error: errors });
    }
    return res.status(status).json({ message, errors: errors?.message });
  }
}
