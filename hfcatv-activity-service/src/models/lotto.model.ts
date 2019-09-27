import {Schema, PaginateModel, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import {LottoDocument} from "../interfaces";

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
