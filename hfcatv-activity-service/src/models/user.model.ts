import {Document, Schema, Model, model} from "mongoose";

export interface UserDocument extends Document {
    userId: string;
    nickname: string;
    lottoCount: number;
    createTime?: Date;
    updateTime?: Date;
    isDelete: boolean;
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