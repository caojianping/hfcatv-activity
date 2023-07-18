import { Schema, PaginateModel, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import { AwardTypeKeys } from "../../common/keys";
import { AwardDocument } from "../interfaces";

const AwardSchema: Schema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    type: {
      type: Schema.Types.Number,
      required: true,
      enum: AwardTypeKeys,
      validate: [
        function (value: number) {
          return AwardTypeKeys.indexOf(value) > -1;
        },
        "无效的奖品类型",
      ],
    },
    title: {
      type: Schema.Types.String,
      required: false,
    },
    desc: {
      type: Schema.Types.String,
      required: false,
    },
    value: {
      type: Schema.Types.Number,
      required: false,
    },
    expire: {
      type: Schema.Types.Mixed,
      required: false,
    },
    ranges: [Schema.Types.Number],
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

AwardSchema.plugin(mongoosePaginate);

AwardSchema.pre("findOneAndUpdate", function (next) {
  this.setOptions({ runValidators: true });
  next();
});

export const AwardModel: PaginateModel<AwardDocument> = model("award", AwardSchema, "award");
