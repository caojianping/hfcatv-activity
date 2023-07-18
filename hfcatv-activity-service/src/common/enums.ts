/***
 * @file: 
 * @author: caojianping
 * @Date: 2021-03-19 14:58:36
 */
/**
 * 角色类型
 */
export enum RoleType {
  Administrator = 0, // 管理员
  Assistant = 1, // 营业员
}

/**
 * 奖品类型
 */
export enum AwardType {
  Nothing = 0, // 参与奖
  Card = 1, // 充值卡券，备注：视频会员、有线电视费
  RedPacket = 2, // 现金红包
  Goods = 3, // 实物礼品，备注：别名“线下办”，又换了别名“营业厅办理”
  MovieTicket = 4, // 观影券，备注：点播返现（类似固定红包）
}

/**
 * 奖品等级
 */
export enum AwardRank {
  Zero = 0, // 参与奖
  First = 1, // 一等奖
  Second = 2, // 二等奖
  Third = 3, // 三等奖
  Four = 4, // 四等奖
  Five = 5, // 五等奖
}

/**
 * 活动状态
 */
export enum ActivityStatus {
  UnStarted = 0, // 未开始
  Processing = 1, // 进行中
  Finished = 2, // 已结束
}

/**
 * 充值卡券状态
 */
export enum CardStatus {
  Failed = -3, // 失败
  Expired = -2, // 已过期
  Rejected = -1, // 已驳回
  Default = 0, // 默认状态
}

/**
 * 现金红包状态
 */
export enum RedPacketStatus {
  SendFailed = -3, // 发放失败
  Expired = -2, // 已过期
  Rejected = -1, // 已驳回
  Default = 0, // 默认状态，未领取
  UnSended = 1, // 待发放
  Received = 2, // 已领取
}

/**
 * 实物礼品状态
 */
export enum GoodsStatus {
  SendFailed = -3, // 发货失败
  Expired = -2, // 已过期
  Rejected = -1, // 已驳回
  Default = 0, // 默认状态，未领取
  UnSended = 1, // 待发货
  Sending = 2, // 发货中
  Received = 3, // 已收货
}

/**
 * 观影券状态
 */
export enum MovieTicketStatus {
  SendFailed = -3, // 使用失败
  Expired = -2, // 已过期
  Rejected = -1, // 已驳回
  Default = 0, // 默认状态，未使用
  Used = 1, // 已使用
}
