import {AwardService} from "../services/index";
import {AwardType} from "../common/enums";
import Database from "../db";

Database.connect();

const awardService = new AwardService();

async function addAwards() {
    await awardService.addAward("谢谢参与", AwardType.Nothing);
    await awardService.addAward("爱奇艺视频会员", AwardType.MemberCard);
    await awardService.addAward("1-5元现金红包", AwardType.RedPacket, 1, 5);
}

async function updateAward(id: string) {
    await awardService.updateAward(id, {name: "谢谢参与123"});
}

async function removeAwards() {
    await awardService.model.remove({});
}
