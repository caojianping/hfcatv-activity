/***
 * @file: 
 * @author: caojianping
 * @Date: 2021-03-19 14:58:36
 */
import { Utils } from "../common/utils";
import { BusinessError, ErrorType } from "../error";
import { AwardDocument, AwardDetailDocument } from "../app/interfaces";
import { ActivityService } from "../app/services";

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

      if (awardDetail.remainStock > 0) {
        filterDetails.push(awardDetail);
      }
    }
    if (filterDetails.length <= 0)
      return Promise.reject(new BusinessError(ErrorType.Others.code, `${ErrorType.Others.message}:[奖品库存不足]`));

    // 3、在剩余的奖品配置中进行抽奖算法
    let temp = [];
    for (let j = 0; j < filterDetails.length; j++) {
      let awardDetail: AwardDetailDocument = filterDetails[j],
        award: AwardDocument = awardDetail.award;
      if (!award) continue;

      let value = Math.random() * 100 * awardDetail.weight;
      temp.push({ item: award, value: value });
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

  static isExpired(createTime: Date, expire?: number | Array<Date>): boolean {
    if (!expire) return false;

    const today = new Date().getTime();
    if (typeof expire === "number") {
      let expireTime = Utils.dateCalculate(createTime, "d", expire).getTime();
      return today > expireTime;
    } else if (Array.isArray(expire)) {
      let startTime = expire[0].getTime(),
        endTime = expire[1].getTime();
      return !(today >= startTime && today < endTime);
    } else throw new BusinessError(ErrorType.InvalidType.code, `${ErrorType.InvalidType.message}:[过期时间]`);
  }
}
