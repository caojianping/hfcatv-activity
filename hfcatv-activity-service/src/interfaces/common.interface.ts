import {Document} from "mongoose";
import {AwardRank, AwardType} from "../common/enums";

export interface BaseDocument extends Document {
	createTime: Date;
	updateTime?: Date;
	isDelete: boolean;
}

export interface AwardBaseVO {
    id: string;
    name: string;
    type: AwardType;
    rank: AwardRank;
}

export interface AwardVO extends AwardBaseVO {
    stock: number;
    weight: number;
}
