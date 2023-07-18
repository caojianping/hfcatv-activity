import {AwardType} from "../common/enums";
import {BaseDocument} from "./common.interface";

export interface AwardDocument extends BaseDocument {
    _id: any;						// 奖品编号
    name: string;					// 奖品名称
    type: AwardType;				// 奖品类型
    title?: string;					// 奖品标题
    desc?: string;					// 奖品描述
    value?: number;					// 奖品价值：奖品类型为现金红包时，此字段可以为空
    expire?: number | Array<Date>;	// 有效期：固定天数内或者日期范围
    ranges?: Array<number>;			// 红包范围：数组第一个值为最小红包；数组第二个值为最大红包
}
