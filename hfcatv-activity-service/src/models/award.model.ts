import {Schema, PaginateModel, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import {AwardDocument} from "../interfaces";

const AwardSchema: Schema = new Schema({
	name: {
		type: Schema.Types.String,
		required: true
	},
	type: {
		type: Schema.Types.Number,
		required: true,
		enum: [0, 1, 2, 3, 4],// 参与奖、会员卡、红包、物品、观影券等
		validate: [
			function (value: number) {
				return [0, 1, 2, 3, 4].indexOf(value) > -1;
			},
			"无效的奖品类型"
		]
	},
	minimum: {
		type: Schema.Types.Number,
		required: false
	},
	maximum: {
		type: Schema.Types.Number,
		required: false
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

AwardSchema.plugin(mongoosePaginate);

AwardSchema.pre("findOneAndUpdate", function (next) {
	this.setOptions({runValidators: true});
	next();
});

export const AwardModel: PaginateModel<AwardDocument> = model("award", AwardSchema, "award");
