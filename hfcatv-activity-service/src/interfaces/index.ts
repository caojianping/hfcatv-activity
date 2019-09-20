import {Document} from "mongoose";

export interface BaseDocument extends Document {
    createTime?: Date;
    updateTime?: Date;
    isDelete: boolean;
}