import {Schema, PaginateModel, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import {AwardDetailDocument, ActivityDocument} from "../interfaces";

const ActivitySchema: Schema = new Schema({
    title: {
        type: Schema.Types.String,
        required: true
    },
    startTime: {
        type: Schema.Types.Date,
        required: true
    },
    endTime: {
        type: Schema.Types.Date,
        required: true
    },
    awards: [
        new Schema({
            award: {
                type: Schema.Types.ObjectId,
                ref: "award"
            },
            rank: {
                type: Schema.Types.Number,
                required: true,
                enum: [0, 1, 2, 3, 4, 5],// 参与奖、一等奖、二等奖、三等奖……
                validate: [
                    function (value: number) {
                        return [0, 1, 2, 3, 4, 5].indexOf(value) > -1;
                    },
                    "无效的活动状态"
                ]
            },
            stock: {
                type: Schema.Types.Number,
                required: true
            },
            weight: {
                type: Schema.Types.Number,
                required: true
            }
        }, {_id: false})
    ],
    status: {
        type: Schema.Types.Number,
        required: true,
        enum: [0, 1, 2],// 未开始、进行中、已结束
        validate: [
            function (value: number) {
                return [0, 1, 2].indexOf(value) > -1;
            },
            "无效的活动状态"
        ]
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

ActivitySchema.plugin(mongoosePaginate);

ActivitySchema.pre("findOneAndUpdate", function (next) {
    this.setOptions({runValidators: true});
    next();
});

export const ActivityModel: PaginateModel<ActivityDocument<AwardDetailDocument>> = model("activity", ActivitySchema, "activity");
