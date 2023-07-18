import { BaseDocument } from "./common.interface";

export interface UserDocument extends BaseDocument {
  _id: any; // 用户编号
  unionId: string; // 微信unionId
  openId: string; // 微信openId
  nickname: string; // 微信昵称
  lottoCount: number; // 抽奖次数
}
