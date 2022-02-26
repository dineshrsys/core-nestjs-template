import { PaginationParamsInterface } from './pagination-params.interface';

export interface SuccessResponseInterface<T> {
    readonly data: T;
    readonly options?: {
        readonly paginationParams: PaginationParamsInterface;
        readonly totalCount: number;
    };
}
