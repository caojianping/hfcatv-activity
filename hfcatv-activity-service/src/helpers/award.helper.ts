import {ActivityAwardDocument, AwardBaseVO, AwardDocument, AwardVO} from "../interfaces";

export default class AwardHelper {
    static convertToAwardVO(activityAward?: ActivityAwardDocument, isBase: boolean = false): AwardBaseVO | AwardVO | null {
        if (!activityAward) return null;

        let award: AwardDocument = activityAward.award;
        if (isBase) {
            return <AwardBaseVO>{
                id: award._id,
                name: award.name,
                type: award.type,
                rank: activityAward.rank
            };
        } else {
            return <AwardVO>{
                id: award._id,
                name: award.name,
                type: award.type,
                rank: activityAward.rank,
                stock: activityAward.stock,
                weight: activityAward.weight
            };
        }
    }
};
