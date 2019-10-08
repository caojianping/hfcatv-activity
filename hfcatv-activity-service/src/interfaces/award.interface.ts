import {AwardType} from "../common/enums";
import {BaseDocument} from "./common.interface";

export interface AwardDocument extends BaseDocument {
    _id: any;           // 奖品编号
    name: string;       // 奖品名称
    type: AwardType;    // 奖品类型
    minimum?: number;   // 红包最小值
    maximum?: number;   // 红包最大值
}
