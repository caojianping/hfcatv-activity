import {Schema, PaginateModel, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import {UserDocument} from "../interfaces";

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