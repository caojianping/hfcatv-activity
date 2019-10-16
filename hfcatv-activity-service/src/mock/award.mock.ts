import {AwardService} from "../services/index";
import {AwardType} from "../common/enums";
import Database from "../db";

Database.connect();

const awardService = new AwardService();

async function addAwards() {
	await awardService.addAward({name: "谢谢参与", type: AwardType.Nothing});
	await awardService.addAward({name: "爱奇艺视频会员", type: AwardType.Card});
}

async function updateAward(id: string) {
	await awardService.updateAward(id, {name: "谢谢参与123"});
}

async function removeAwards() {
	await awardService.model.remove({});
}
