import {AwardRank, AwardType} from "../common/enums";

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

export interface AwardBaseVO {
    id: string;
    name: string;
    type: AwardType;
    rank: AwardRank;
}

export interface AwardVO extends AwardBaseVO {
    stock: number;
    weight: number;
}
