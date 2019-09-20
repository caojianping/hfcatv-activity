import {Schema, Model, model} from "mongoose";
import {BaseDocument} from "../interfaces";

export interface LottoDocument extends BaseDocument {
    userId: string;
    award: any;
    status: number;
    acceptInfo: any;
    failCause: string;
    simulateName: string;
    handler: any;
}

const LottoSchema: Schema = new Schema({
    userId: {
        type: "String",
        required: true
    },
    award: {
        type: Schema.Types.ObjectId,
        ref: "award"
    },
    status: {
        type: "Number",
        enum: [-3, -2, -1, 0, 1, 2, 3],
        default: 0
    },
    acceptInfo: {
        type: Schema.Types.Mixed,
        required: false
    },
    failCause: {
        type: "String",
        required: false
    },
    simulateName: {
        type: "String",
        required: false
    },
    handler: {
        type: Schema.Types.ObjectId,
        ref: "manager"
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

export const LottoModel: Model<LottoDocument> = model("lotto", LottoSchema, "lotto");
