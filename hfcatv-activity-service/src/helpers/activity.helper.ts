/***
 * @file: 
 * @author: caojianping
 * @Date: 2021-03-19 14:58:36
 */
import { ActivityStatus } from "../common/enums";

export default class ActivityHelper {
  static getActivityStatus(startTime: Date, endTime: Date): ActivityStatus {
    let sms = startTime.getTime(),
      ems = endTime.getTime(),
      nms = new Date().getTime();
    if (nms < sms) return ActivityStatus.UnStarted;
    else if (nms >= sms && nms < ems) return ActivityStatus.Processing;
    else return ActivityStatus.Finished;
  }
}
