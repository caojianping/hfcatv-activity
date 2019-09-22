import {Schema, PaginateModel, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import {BaseDocument} from "../interfaces";

export interface UserDocument extends BaseDocument {
    _id: any;               // 用户编号
    openId: string;         // 微信编号
    nickname: string;       // 昵称
    lottoCount: number;     // 抽奖次数
}

const UserSchema: Schema = new Schema({
    openId: {
        type: Schema.Types.String,
        required: true
    },
    nickname: {
        type: Schema.Types.String,
        required: true
    },
    lottoCount: {
        type: Schema.Types.Number,
        required: true,
        default: 0,
        min: 0
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

UserSchema.plugin(mongoosePaginate);

UserSchema.pre("findOneAndUpdate", function (next) {
    this.setOptions({runValidators: true});
    next();
});

export const UserModel: PaginateModel<UserDocument> = model("user", UserSchema, "user");