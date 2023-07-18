export const RoleTypes: Array<string> = ["管理员", "营业员"];

export const AwardTypes: Array<string> = ["参与奖", "充值卡券", "现金红包", "实物礼品", "观影券"];

export const AwardExpireTypes: Array<string> = ["天数", "日期范围"];

export const AwardRanks: Array<string> = ["参与奖", "一等奖", "二等奖", "三等奖", "四等奖", "五等奖"];

export const ActivityStatuses: Array<string> = ["未开始", "进行中", "已结束"];

export const CardStatusMap: any = {
    "-3": "失败",
    "-2": "已过期",
    "-1": "已驳回",
    "0": ""
};

export const RedPacketStatusMap: any = {
    "-3": "发放失败",
    "-2": "已过期",
    "-1": "已驳回",
    "0": "未领取",
    "1": "待发放",
    "2": "已发放"
};

export const GoodsStatusMap: any = {
    "-3": "发货失败",
    "-2": "已过期",
    "-1": "已驳回",
    "0": "未领取",
    "1": "待发货",
    "2": "发货中",
    // "3": "已收货"
    "3": "已发放"
};

export const MovieTicketStatusMap: any = {
    "-3": "使用失败",
    "-2": "已过期",
    "-1": "已驳回",
    "0": "未使用",
    "1": "已使用"
};

export const OperateTypes: Array<string> = ["添加", "编辑"];
