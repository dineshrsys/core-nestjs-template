import { PaginationParamsInterface } from '@interfaces/pagination-params.interface';

class ResponseUtil {
    public success(
        data: any,
        options?: {
            totalCount: number;
            paginationParams: PaginationParamsInterface;
        },
    ) {
        return {
            data,
            options,
        };
    }
}

export default new ResponseUtil();
