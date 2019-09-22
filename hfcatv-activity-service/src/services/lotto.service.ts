import {
    AwardDocument,
    LottoDocument,
    LottoModel,
    RedPacketInfo,
    GoodsInfo,
    MemberCardInfo,
} from "../models";
import BaseService from "./base.service";
import ActivityService from "./activity.service";
import UserService from "./user.service";
import LottoHelper from "../helpers/lotto.helper";
import {AwardType, GoodsStatus, RedPacketStatus} from "../common/enums";

export default class LottoService extends BaseService {
    private activityService: ActivityService = new ActivityService();
    private userService: UserService = new UserService();

    constructor() {
        super(LottoModel);
    }

    async getLottoCount(activityId: string, awardId: string) {
        if (!activityId) return Promise.reject("活动编号不可以为空");
        if (!awardId) return Promise.reject("奖品编号不可以为空");

        return await this.model.count({activity: activityId, award: awardId});
    }

    async addLotto(userId: string, activityId: string): Promise<LottoDocument> {
        if (!userId) return Promise.reject("用户编号不可以为空");
        if (!activityId) return Promise.reject("活动编号不可以为空");

        let isFinished = await this.activityService.isFinished(activityId);
        if (isFinished) return Promise.reject("该活动已经结束");

        let lottoCount = await this.userService.getLottoCount(userId);
        if (lottoCount <= 0) return Promise.reject("您的抽奖机会已经用完啦");

        let attachInfo: RedPacketInfo | GoodsInfo | MemberCardInfo | undefined;
        let award: AwardDocument = await LottoHelper.getRandomAward(activityId),
            awardType = award.type;
        if (awardType === AwardType.Nothing) {
            attachInfo = undefined;
        } else if (awardType === AwardType.RedPacket) {
            attachInfo = <RedPacketInfo>{
                amount: LottoHelper.getRandomRedPacket(1, 5),
                status: RedPacketStatus.UnReceived,
                message: ""
            };
        } else if (awardType === AwardType.Goods) {
            attachInfo = <GoodsInfo>{
                name: "",
                mobile: "",
                address: "",
                status: GoodsStatus.UnReceived,
                message: ""
            };
        } else if (awardType === AwardType.MemberCard) {
            attachInfo = <MemberCardInfo>{code: "123456789"};
        }
        let lotto = await this.model.create({
            user: userId,
            activity: activityId,
            award: award._id,
            attachInfo: attachInfo
        });
        console.log("LottoService.addLotto lotto:", lotto);

        let user = await this.userService.reduceLottoCount(userId);
        console.log("LottoService.addLotto user:", user);
        return lotto;
    }
};
