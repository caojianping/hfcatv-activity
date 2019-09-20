import {Schema, Model, model} from "mongoose";
import {BaseDocument} from "../interfaces";

export interface ManagerDocument extends BaseDocument {
    username: string;
    password: string;
}

const ManagerSchema: Schema = new Schema({
    username: {
        type: "String",
        required: true
    },
    password: {
        type: "String",
        required: true
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

export const ManagerModel: Model<ManagerDocument> = model("manager", ManagerSchema, "manager");