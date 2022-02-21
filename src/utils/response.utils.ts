import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';

class ResponseUtils {
  public success(
    entity: string,
    data: any,
    options?: {
      totalCount: number;
      paginationParams: PaginationParamsInterface;
    },
  ) {
    return { entity, data, options };
  }
}
export default new ResponseUtils();
