import { ActivityStatus, AwardRank } from "../../common/enums";
import { BaseDocument } from "./common.interface";
import { AwardDocument } from "./award.interface";

export interface ActivityDocument<T> extends BaseDocument {
  _id: any; // 活动编号
  title: string; // 活动标题
  startTime: Date; // 开始时间
  endTime: Date; // 结束时间
  awards: Array<T>; // 奖品列表
  status: ActivityStatus; // 活动状态
  switch: boolean; // 活动开关
}

export interface AwardDetailDocument {
  award: AwardDocument; // 奖品
  rank: AwardRank; // 级别
  weight: number; // 权重
  totalStock: number; // 全部库存
  remainStock: number; // 剩余库存
  isDelete: boolean;
}
