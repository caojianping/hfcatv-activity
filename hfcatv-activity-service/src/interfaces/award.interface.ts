import {AwardType} from "../common/enums";
import {BaseDocument} from "./common.interface";

export interface AwardDocument extends BaseDocument {
    _id: any;           // 奖品编号
    name: string;       // 奖品名称
    type: AwardType;    // 奖品类型
}