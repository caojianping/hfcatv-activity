/**
 * 奖品类型
 */
export enum AwardType {
	Nothing = 0,        // 参与奖
	MemberCard = 1,     // 会员卡，备注：别名“充值卡券”
	RedPacket = 2,      // 红包，备注：别名“现金红包”
	Goods = 3,          // 物品，备注：别名“线下办”
	MovieTicket = 4		// 观影券，备注：类似于固定的现金红包
}

/**
 * 奖品等级
 */
export enum AwardRank {
	Zero = 0,       // 参与奖
	First = 1,      // 一等奖
	Second = 2,     // 二等奖
	Third = 3,      // 三等奖
	Four = 4,       // 四等奖
	Five = 5        // 五等奖
}

/**
 * 活动状态
 */
export enum ActivityStatus {
	UnStarted = 0,      // 未开始
	Processing = 1,     // 进行中
	Finished = 2        // 已结束
}

/**
 * 红包状态
 */
export enum RedPacketStatus {
	SendFailed = -3,    // 发放失败
	Expired = -2,       // 已过期
	Rejected = -1,      // 已驳回
	UnReceived = 0,     // 未领取
	UnSended = 1,       // 待发放
	Received = 2        // 已领取
}

/**
 * 物品状态
 */
export enum GoodsStatus {
	SendFailed = -3,    // 发货失败
	Expired = -2,       // 已过期
	Rejected = -1,      // 已驳回
	UnReceived = 0,     // 未领取
	UnSended = 1,       // 待发货
	Sending = 2,        // 发货中
	Received = 3        // 已收货
}
