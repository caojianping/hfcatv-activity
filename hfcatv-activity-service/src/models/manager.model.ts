import {Document, Schema, Model, model} from "mongoose";

export interface ManagerDocument extends Document {
    username: string;
    password: string;
    createTime?: Date;
    updateTime?: Date;
    isDelete: boolean;
}

const ManagerSchema: Schema = new Schema({
    /**
     * 用户名
     */
    username: {
        type: "String",
        required: true
    },
    /**
     * 密码
     */
    password: {
        type: "String",
        required: true
    },
    /**
     * 创建时间
     */
    createTime: {
        type: "Date",
        default: new Date()
    },
    /**
     * 更新时间
     */
    updateTime: {
        type: "Date",
        required: false
    },
    /**
     * 是否删除
     */
    isDelete: {
        type: "Boolean",
        default: false
    }
}, {_id: true});

export const ManagerModel: Model<ManagerDocument> = model("manager", ManagerSchema, "manager");