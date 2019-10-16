import {AwardDetailDocument, AwardBaseVO, AwardDocument, AwardVO} from "../interfaces";

export default class AwardHelper {
	static convertToAwardVO(awardDetail?: AwardDetailDocument, isBase: boolean = false): AwardBaseVO | AwardVO | null {
		if (!awardDetail) return null;

		let award: AwardDocument = awardDetail.award;
		if (isBase) {
			return <AwardBaseVO>{
				id: award._id,
				name: award.name,
				type: award.type,
				title: award.title,
				desc: award.desc,
				value: award.value,
				expire: award.expire,
				// ranges: award.ranges,
				rank: awardDetail.rank
			};
		} else {
			return <AwardVO>{
				id: award._id,
				name: award.name,
				type: award.type,
				title: award.title,
				desc: award.desc,
				value: award.value,
				expire: award.expire,
				// ranges: award.ranges,
				rank: awardDetail.rank,
				stock: awardDetail.stock,
				weight: awardDetail.weight
			};
		}
	}
};
