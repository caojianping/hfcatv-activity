import {Utils} from "../src/common/utils";
import {AwardDocument} from "../src/interfaces";
import {ActivityHelper} from "../src/helpers";
import {AwardService, ActivityService} from "../src/services";
import Database from "../src/db";

Database.connect();

const awardService = new AwardService();
const activityService = new ActivityService();

async function addActivity() {
    let awards = await awardService.getAwards(),
        mapAwards = awards.map((award: AwardDocument, index: number) => ({
            award: award._id,
            rank: index,
            stock: 9999,
            weight: 0.2
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
