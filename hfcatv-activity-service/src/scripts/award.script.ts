import AwardService from "../services/award.service";
import {AwardType} from "../common/enums";
import Database from "../db";

Database.connect();

const awardService = new AwardService();

// awardService.model.remove({});

// awardService.addAwards([
//     {
//         name: "参与奖",
//         type: AwardType.Nothing,
//         desc: "谢谢参与",
//         stock: 9999,
//         weight: 0.8
//     },
//     {
//         name: "一等奖",
//         type: AwardType.MemberCard,
//         desc: "爱奇艺视频会员",
//         stock: 9999,
//         weight: 0.05
//     },
//     {
//         name: "二等奖",
//         type: AwardType.RedPacket,
//         desc: "1-5元现金红包",
//         stock: 9999,
//         weight: 0.15
//     }
// ]);

// awardService.updateAward({type: AwardType.Nothing}, {$set:{name: "参与奖"}});
