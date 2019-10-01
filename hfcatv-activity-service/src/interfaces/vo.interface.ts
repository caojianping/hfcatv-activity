import {AwardRank, AwardType} from "../common/enums";

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
