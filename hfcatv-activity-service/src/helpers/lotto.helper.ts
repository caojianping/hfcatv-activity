import {AwardDetailDocument, AwardDocument} from "../interfaces";
import ActivityService from "../services/activity.service";
import LottoService from "../services/lotto.service";
import BusinessError from "../error/business-error";
import ErrorType from "../error/error-type";

export default class LottoHelper {
	static async getRandomAward(activityId: string): Promise<AwardDocument> {
		// 1、获取本次活动的奖品配置
		// 2、过滤已经抽完的奖品数据
		let awardDetails: Array<AwardDetailDocument> = await new ActivityService().getAwardDetails(activityId),
			filterDetails: Array<AwardDetailDocument> = [];
		for (let i = 0; i < awardDetails.length; i++) {
			let awardDetail: AwardDetailDocument = awardDetails[i],
				award: AwardDocument = awardDetail.award;
			if (!award) continue;

			// let lottoCount = await new LottoService().getLottoCount(activityId, award._id);
			// if (lottoCount < awardDetail.stock) {
			//     filterDetails.push(awardDetail);
			// }
			if (awardDetail.stock > 0) {
				filterDetails.push(awardDetail);
			}
		}
		if (filterDetails.length <= 0) return Promise.reject(new BusinessError(ErrorType.Others.code, `${ErrorType.Others.message}:[奖品库存不足]`));

		// 3、在剩余的奖品配置中进行抽奖算法
		let temp = [];
		for (let j = 0; j < filterDetails.length; j++) {
			let awardDetail: AwardDetailDocument = filterDetails[j],
				award: AwardDocument = awardDetail.award;
			if (!award) continue;

			let value = Math.random() * 100 * awardDetail.weight;
			temp.push({item: award, value: value});
		}
		temp.sort(function (m, n) {
			return n.value - m.value;
		});
		return temp[0].item;
	}

	static getRandomRedPacket(min: number, max: number): number {
		let num = Math.random() * (max - min) + min;
		return parseFloat(num.toFixed(2));
	}
};
