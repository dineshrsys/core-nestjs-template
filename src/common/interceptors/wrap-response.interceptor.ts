import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { Observable } from 'rxjs';

@Injectable()
export default class WrapResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle();
        // return next.handle().pipe(
        //   map(({ data }) => ({ message: 'success', data })),
        // );
    }
}
