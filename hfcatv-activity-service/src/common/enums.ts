/**
 * 奖品类型
 */
export enum AwardType {
    Nothing = 0,        // 参与奖
    MemberCard = 1,     // 会员卡
    RedPacket = 2       // 现金红包
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

export enum ActivityStatus {
    Unstart = 0,        // 未开始
    Processing = 1,     // 进行中
    Finished = 2        // 已结束
}
