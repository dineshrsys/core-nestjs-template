import { PaginationParamsInterface } from './pagination-params.interface';

export interface SuccessResponseInterface {
  readonly data: any;
  readonly options?: {
    readonly paginationParams: PaginationParamsInterface;
    readonly totalCount: number;
  };
}
