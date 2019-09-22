import {Schema, Model, model} from "mongoose";
import {BaseDocument} from "../interfaces";

export interface AwardDocument extends BaseDocument {
    _id: any;
    name: string;
    type: number;
    desc: string;
    stock: number;
    weight: number;
}

const AwardSchema: Schema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    type: {
        type: Schema.Types.Number,
        required: true,
        enum: [0, 1, 2],// 参与奖、一等奖、二等奖……
        validate: [
            function (value: number) {
                return [0, 1, 2].indexOf(value) > -1;
            },
            "无效的奖品类型"
        ]
    },
    desc: {
        type: Schema.Types.String,
        required: true
    },
    stock: {
        type: Schema.Types.Number,
        required: true
    },
    weight: {
        type: Schema.Types.Number,
        required: true
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

AwardSchema.pre("findOneAndUpdate", function (next) {
    this.setOptions({runValidators: true});
    next();
});

export const AwardModel: Model<AwardDocument> = model("award", AwardSchema, "award");
