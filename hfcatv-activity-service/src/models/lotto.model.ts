import {Document, Schema, Model, model} from "mongoose";

export interface LottoDocument extends Document {
    userId: string;
    awardType: number;
    awardDesc: string;
    awardAmount: number;
    awardState: number;
    acceptInfo: any;
    failCause: string;
    simulateName: string;
    createTime?: Date;
    updateTime?: Date;
    isDelete: boolean;
}

const LottoSchema: Schema = new Schema({
    userId: {
        type: "String",
        required: true
    },
    awardType: {
        type: "Number",
        default: 1
    },
    awardDesc: {
        type: "String",
        required: false
    },
    awardAmount: {
        type: "Number",
        required: false
    },
    awardState: {
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
