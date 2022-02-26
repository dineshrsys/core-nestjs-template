import { map, Observable } from 'rxjs';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import ResponseUtils from '@utils/response.utils';
import { SuccessResponseInterface } from '@interfaces/success-response.interface';

@Injectable()
export class TransformationInterceptor<T> implements NestInterceptor<T, SuccessResponseInterface<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<SuccessResponseInterface<T>> {
        return next.handle()
            .pipe(map((data) => ResponseUtils.success(data || null)));
    }
}
