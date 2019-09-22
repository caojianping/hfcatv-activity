import {AwardService} from "../services";
import {AwardType} from "../common/enums";
import Database from "../db";

Database.connect();

const awardService = new AwardService();

// awardService.model.remove({});

// awardService.addAwards([
//     {
//         name: "谢谢参与",
//         type: AwardType.Nothing
//     },
//     {
//         name: "爱奇艺视频会员",
//         type: AwardType.MemberCard
//     },
//     {
//         name: "1-5元现金红包",
//         type: AwardType.RedPacket
//     }
// ]);

// awardService.updateAward({type: AwardType.Nothing}, {name: "谢谢参与123"});