import {Utils} from "../common/utils";
import {ActivityHelper} from "../helpers";
import {AwardDocument} from "../app/interfaces";
import {AwardService, ActivityService} from "../app/services";
import Database from "../db";

Database.connect();

const awardService = new AwardService();
const activityService = new ActivityService();

async function addActivity() {
    let awards = await awardService.getAwards(),
        mapAwards = awards.map((award: AwardDocument, index: number) => ({
            award: award._id,
            rank: index,
            weight: 0.2,
            totalStock: 9999,
            remainStock: 9999
        })),
        startTime = Utils.dateCalculate(new Date(), "d", -7),
        endTime = Utils.dateCalculate(new Date(), "d", 7);
    await activityService.addActivity({
        title: "测试抽奖活动",
        startTime: startTime,
        endTime: endTime,
        awards: mapAwards,
        status: ActivityHelper.getActivityStatus(startTime, endTime)
    });
}

async function removeActivities() {
    await activityService.model.remove({});
}
