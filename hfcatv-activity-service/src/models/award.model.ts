import {Schema, Model, model} from "mongoose";
import {BaseDocument} from "../interfaces";

export interface AwardDocument extends BaseDocument {
    name: string;
    type: number;
    desc: string;
    amount: number;
    stock: number;
    weight: number;
}

const AwardSchema: Schema = new Schema({
    name: {
        type: "String",
        required: true
    },
    type: {
        type: "Number",
        required: true
    },
    desc: {
        type: "String",
        required: false
    },
    amount: {
        type: "Number",
        required: false
    },
    stock: {
        type: "Number",
        required: true
    },
    weight: {
        type: "Number",
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

export const AwardModel: Model<AwardDocument> = model("award", AwardSchema, "award");