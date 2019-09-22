import {AwardService} from "../services";
import {AwardType} from "../common/enums";
import Database from "../db";

Database.connect();

const awardService = new AwardService();

async function addAwards() {
    await awardService.addAwards([
        {
            name: "谢谢参与",
            type: AwardType.Nothing
        },
        {
            name: "爱奇艺视频会员",
            type: AwardType.MemberCard
        },
        {
            name: "1-5元现金红包",
            type: AwardType.RedPacket
        }
    ]);
}

async function updateAward() {
    await awardService.updateAward({type: AwardType.Nothing}, {name: "谢谢参与123"});
}

async function removeAwards() {
    await awardService.model.remove({});
}
