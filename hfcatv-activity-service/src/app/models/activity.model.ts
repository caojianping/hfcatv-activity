import { Schema, PaginateModel, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import { ActivityStatusKeys, AwardRankKeys } from "../../common/keys";
import { AwardDetailDocument, ActivityDocument } from "../interfaces";

const ActivitySchema: Schema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
    },
    startTime: {
      type: Schema.Types.Date,
      required: true,
    },
    endTime: {
      type: Schema.Types.Date,
      required: true,
    },
    status: {
      type: Schema.Types.Number,
      required: true,
      enum: ActivityStatusKeys, // 未开始、进行中、已结束
      validate: [
        function (value: number) {
          return ActivityStatusKeys.indexOf(value) > -1;
        },
        "无效的活动状态",
      ],
    },
    switch: {
      type: Schema.Types.Boolean,
      required: true,
    },
    awards: [
      new Schema(
        {
          award: {
            type: Schema.Types.ObjectId,
            ref: "award",
          },
          rank: {
            type: Schema.Types.Number,
            required: true,
            enum: AwardRankKeys, // 参与奖、一等奖、二等奖、三等奖……
            validate: [
              function (value: number) {
                return AwardRankKeys.indexOf(value) > -1;
              },
              "无效的活动状态",
            ],
          },
          weight: {
            type: Schema.Types.Number,
            required: true,
          },
          totalStock: {
            type: Schema.Types.Number,
            required: true,
          },
          remainStock: {
            type: Schema.Types.Number,
            required: true,
          },
          isDelete: {
            type: Schema.Types.Boolean,
            required: true,
          },
        },
        { _id: false }
      ),
    ],
    createTime: {
      type: Schema.Types.Date,
      required: true,
    },
    updateTime: {
      type: Schema.Types.Date,
      required: false,
    },
    isDelete: {
      type: Schema.Types.Boolean,
      required: true,
    },
  },
  { _id: true }
);

ActivitySchema.plugin(mongoosePaginate);

ActivitySchema.pre("findOneAndUpdate", function (next) {
  this.setOptions({ runValidators: true });
  next();
});

export const ActivityModel: PaginateModel<ActivityDocument<AwardDetailDocument>> = model(
  "activity",
  ActivitySchema,
  "activity"
);
