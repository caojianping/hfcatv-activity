import {AwardService, ActivityService} from "../services";
import {ActivityDocument, AwardDocument} from "../models";
import Database from "../db";
import {Utils} from "../common/utils";
import {ActivityStatus} from "../common/enums";

Database.connect();

const awardService = new AwardService();
const activityService = new ActivityService();

// activityService.model.remove({});

async function test() {
    let awards = await awardService.getAwards(),
        maps = awards.map((award: AwardDocument, index: number) => {
            return {
                award: award._id,
                rank: index,
                stock: 9999,
                weight: 0.2
            };
        });
    await activityService.addActivity({
        title: "测试抽奖活动",
        startTime: Utils.dateCalculate(new Date(), "d", -7),
        endTime: Utils.dateCalculate(new Date(), "d", 7),
        awards: maps,
        status: ActivityStatus.Processing
    });
}

// test();

activityService.getActivity();