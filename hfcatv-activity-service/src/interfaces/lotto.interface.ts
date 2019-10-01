import {GoodsStatus, RedPacketStatus} from "../common/enums";
import {BaseDocument} from "./common.interface";
import {ManagerDocument} from "./manager.interface";
import {AwardDocument} from "./award.interface";
import {ActivityDocument} from "./activity.interface";
import {UserDocument} from "./user.interface";

export interface RedPacketInfo {
	amount: number;             // 红包金额
	status: RedPacketStatus;    // 红包状态
	message: string;
}

export interface GoodsInfo {
	name: string;           // 姓名
	mobile: string;         // 手机号
	address: string;        // 地址
	status: GoodsStatus;    // 物品状态
	message: string;
}

export interface MemberCardInfo {
	code: string;       // 激活码
}

export interface LottoDocument<T> extends BaseDocument {
	_id: any;                                                   // 抽奖编号
	user: UserDocument;                                         // 抽奖用户
	activity: ActivityDocument<T>;                                 // 抽奖活动
	award: AwardDocument;                                       // 抽奖奖品
	attachInfo?: RedPacketInfo | GoodsInfo | MemberCardInfo;    // 附加信息
	handler: ManagerDocument;                                   // 处理人
}
