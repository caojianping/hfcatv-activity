import {Document, Schema, Model, model} from "mongoose";

export interface AwardDocument extends Document {
    name: string;
    type: number;
    desc: string;
    stock: number;
    weight: number;
    createTime?: Date;
    updateTime?: Date;
    isDelete: boolean;
}

const AwardSchema: Schema = new Schema({
    name: {
        type: "String",
        required: true
    },
    type: {
        type: "Number",
        default: 1
    },
    desc: {
        type: "String",
        required: false
    },
    stock: {
        type: "Number",
        required: false
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