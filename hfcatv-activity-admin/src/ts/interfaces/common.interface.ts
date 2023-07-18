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
    title?: string;					// 奖品标题
    desc?: string;					// 奖品描述
    value?: number;					// 奖品价值：奖品类型为现金红包时，此字段可以为空
    expire?: number | Array<Date>;	// 有效期：固定天数内或者日期范围
    ranges?: Array<number>;			// 红包范围：数组第一个值为最小红包；数组第二个值为最大红包
    rank: AwardRank;
}

export interface AwardVO extends AwardBaseVO {
    weight: number;
    totalStock: number;
    remainStock: number;
    isDelete: boolean;
}
