export interface BaseDocument {
    createTime: Date;
    updateTime?: Date;
    isDelete: boolean;
}

export interface PaginateResult<T> {
    docs: Array<T>;
    total: number;
    limit: number;
    page?: number;
    pages?: number;
    offset?: number;
}
