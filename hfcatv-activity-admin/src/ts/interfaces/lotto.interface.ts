import {BaseDocument} from "./common.interface";
import {ActivityDocument} from "./activity.interface";
import {UserDocument} from "./user.interface";

export interface CardInfo {
    code: string;		// 激活码
}

export interface GoodsInfo {
    name: string;		// 姓名
    mobile: string;		// 手机号
    address: string;	// 地址
}

export interface LottoDocument<T, U> extends BaseDocument {
    _id: any;								// 抽奖编号
    user: UserDocument;						// 抽奖用户
    activity: ActivityDocument<T>;			// 活动
    award: U;								// 奖品
    status?: number;						// 状态：奖品类型为参与奖时，此字段为空
    amount?: number;						// 金额：奖品类型为现金红包时，此字段为产生的随机值；奖品类型为参与奖时，此字段为空；其他时，此字段为奖品价值字段
    message?: string;						// 消息
    attachInfo?: CardInfo | GoodsInfo;		// 附加信息
}
