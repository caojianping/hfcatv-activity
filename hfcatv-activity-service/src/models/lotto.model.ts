import {Schema, PaginateModel, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import {GoodsStatus, RedPacketStatus} from "../common/enums";
import {BaseDocument} from "../interfaces";
import {ManagerDocument} from "./manager.model";
import {AwardDocument} from "./award.model";
import {ActivityDocument} from "./activity.model";
import {UserDocument} from "./user.model";

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

export interface LottoDocument extends BaseDocument {
    _id: any;                                                   // 抽奖编号
    user: UserDocument;                                         // 抽奖用户
    activity: ActivityDocument;                                 // 抽奖活动
    award: AwardDocument;                                       // 抽奖奖品
    attachInfo?: RedPacketInfo | GoodsInfo | MemberCardInfo;    // 附加信息
    handler: ManagerDocument;                                   // 处理人
}

const LottoSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    activity: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "activity"
    },
    award: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "award"
    },
    attachInfo: {
        type: Schema.Types.Mixed,
        required: false
    },
    handler: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "manager"
    },
    createTime: {
        type: Schema.Types.Date,
        required: true,
        default: new Date()
    },
    updateTime: {
        type: Schema.Types.Date,
        required: false
    },
    isDelete: {
        type: Schema.Types.Boolean,
        required: true,
        default: false
    }
}, {_id: true});

LottoSchema.plugin(mongoosePaginate);

LottoSchema.pre("findOneAndUpdate", function (next) {
    this.setOptions({runValidators: true});
    next();
});

export const LottoModel: PaginateModel<LottoDocument> = model("lotto", LottoSchema, "lotto");
