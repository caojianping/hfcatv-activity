import {Schema, Model, model} from "mongoose";
import {BaseDocument} from "../interfaces";

export interface UserDocument extends BaseDocument {
    userId: string;
    nickname: string;
    lottoCount: number;
}

const UserSchema: Schema = new Schema({
    userId: {
        type: "String",
        required: true
    },
    nickname: {
        type: "String",
        required: true
    },
    lottoCount: {
        type: "Number",
        default: 0,
        min: 0
    },
    createTime: {
        type: "Date",
        default: new Date()
    },
    updateTime: {
        type: "Date",
        required: false
    },
    isDelete: {
        type: "Boolean",
        default: false
    }
}, {_id: true});

export const UserModel: Model<UserDocument> = model("user", UserSchema, "user");