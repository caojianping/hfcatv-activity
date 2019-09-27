import {BaseDocument} from "./common.interface";

export interface UserDocument extends BaseDocument {
	_id: any;               // 用户编号
	openId: string;         // 微信编号
	nickname: string;       // 昵称
	lottoCount: number;     // 抽奖次数
}