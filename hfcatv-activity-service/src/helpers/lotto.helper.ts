import {ActivityAwardDocument, AwardDocument} from "../interfaces";
import ActivityService from "../services/activity.service";
import LottoService from "../services/lotto.service";

export default class LottoHelper {
    static async getRandomAward(activityId: string): Promise<AwardDocument> {
        // 1、获取本次活动的奖品配置
        // 2、过滤已经抽完的奖品数据
        let activityAwards = await new ActivityService().getActivityAwards(activityId),
            filters: Array<any> = [];
        for (let i = 0; i < activityAwards.length; i++) {
            let activityAward: ActivityAwardDocument = activityAwards[i],
                award = activityAward.award;
            if (!award) continue;

            let lottoCount = await new LottoService().getLottoCount(activityId, award._id);
            if (lottoCount < activityAward.stock) {
                filters.push(activityAward);
            }
        }

        // 3、在剩余的奖品配置中进行抽奖算法
        let temp = [];
        for (let j = 0; j < filters.length; j++) {
            let activityAward: ActivityAwardDocument = activityAwards[j],
                award = activityAward.award;
            if (!award) continue;

            let value = Math.random() * 100 * activityAward.weight;
            temp.push({item: award, value: value});
        }
        temp.sort(function (m, n) {
            return n.value - m.value;
        });
        return temp[0].item;
    }

    static getRandomRedPacket(min: number, max: number): number {
        let num = Math.random() * (max - min) + min;
        return parseFloat(String(num));
    }
};
