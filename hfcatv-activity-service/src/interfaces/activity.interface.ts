import {ActivityStatus, AwardRank} from "../common/enums";
import {BaseDocument} from "./common.interface";
import {AwardDocument} from "./award.interface";

export interface ActivityDocument extends BaseDocument {
	_id: any;                               // 活动编号
	title: string;                          // 活动标题
	startTime: Date;                        // 开始时间
	endTime: Date;                          // 结束时间
	awards: Array<ActivityAwardDocument>;   // 奖品列表
	status: ActivityStatus;                 // 活动状态
}

export interface ActivityAwardDocument {
	award: AwardDocument;       // 奖品
	rank: AwardRank;            // 级别
	stock: number;              // 库存
	weight: number;             // 权重
}