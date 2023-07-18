/***
 * @file: 
 * @author: caojianping
 * @Date: 2021-03-19 14:58:36
 */
import { AwardDetailDocument, AwardBaseVO, AwardDocument, AwardVO } from "../app/interfaces";

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
        rank: awardDetail.rank,
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
        weight: awardDetail.weight,
        totalStock: awardDetail.totalStock,
        remainStock: awardDetail.remainStock,
      };
    }
  }
}
