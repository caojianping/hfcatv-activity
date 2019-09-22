import {Schema, PaginateModel, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import {BaseDocument} from "../interfaces";

export interface LottoDocument extends BaseDocument {
    _id: any;           // 抽奖编号
    user: any;          // 抽奖用户
    activity: any;      // 抽奖活动
    award: any;         // 抽奖奖品
    handler: any;       // 处理人
}

const LottoSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    activity: {
        type: Schema.Types.ObjectId,
        ref: "activity"
    },
    award: {
        type: Schema.Types.ObjectId,
        ref: "award"
    },
    handler: {
        type: Schema.Types.ObjectId,
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

export const LottoModel: PaginateModel<LottoDocument> = model("lotto", LottoSchema, "lotto");
