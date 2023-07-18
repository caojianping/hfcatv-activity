import { Schema, PaginateModel, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import { AwardDetailDocument, AwardDocument, LottoDocument } from "../interfaces";

const LottoSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    activity: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "activity",
    },
    award: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "award",
    },
    status: {
      type: Schema.Types.Number,
      required: false,
    },
    amount: {
      type: Schema.Types.Number,
      required: false,
    },
    message: {
      type: Schema.Types.String,
      required: false,
    },
    attachInfo: {
      type: Schema.Types.Mixed,
      required: false,
    },
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

LottoSchema.plugin(mongoosePaginate);

LottoSchema.pre("findOneAndUpdate", function (next) {
  this.setOptions({ runValidators: true });
  next();
});

export const LottoModel: PaginateModel<LottoDocument<AwardDetailDocument, AwardDocument>> = model(
  "lotto",
  LottoSchema,
  "lotto"
);
