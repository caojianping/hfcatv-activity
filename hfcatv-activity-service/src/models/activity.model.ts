import {Schema, Model, model} from "mongoose";
import {BaseDocument} from "../interfaces";

export interface ActivityDocument extends BaseDocument {
    title: string;
    startTime: Date;
    endTime: Date;
    awards: Array<any>;
    status: number;
}

const ActivitySchema: Schema = new Schema({
    title: {
        type: "String",
        required: true
    },
    startTime: {
        type: "Date",
        required: true
    },
    endTime: {
        type: "Date",
        required: true
    },
    awards: [
        {
            type: Schema.Types.ObjectId,
            ref: "award"
        }
    ],
    status: {
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

export const ActivityModel: Model<ActivityDocument> = model("activity", ActivitySchema, "activity");