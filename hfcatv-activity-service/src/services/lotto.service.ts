import {BusinessError, ErrorType} from "../error";
import {AwardType, GoodsStatus, RedPacketStatus} from "../common/enums";
import {AwardDocument, UserDocument, RedPacketInfo, GoodsInfo, MemberCardInfo, LottoDocument} from "../interfaces";
import {LottoModel} from "../models";
import {LottoHelper} from "../helpers";

import BaseService from "./base.service";
import UserService from "./user.service";
import ActivityService from "./activity.service";
import {Utils} from "../common/utils";
import {PaginateResult} from "mongoose";

export default class LottoService extends BaseService {
    private activityService: ActivityService = new ActivityService();
    private userService: UserService = new UserService();

    constructor() {
        super(LottoModel);
    }

    async getPageLottos(conditions: any, page: number, limit: number): Promise<PaginateResult<LottoDocument>> {
        if (!conditions) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[查询条件]`));

        console.log("conditions:", conditions);
        let tconditions = {};
        const {nickname, title, type, status} = conditions;
        if (nickname) {
            let userIds = [];// todo: get userIds by nickname
            tconditions["user"] = {$in: userIds};
        }
        if (title) {
            let activityIds = [];// todo: get activityIds by title
            tconditions["activity"] = {$in: activityIds};
        }
        if (type) {
            let awardIds = [];// todo: get awardIds by type
            tconditions["award"] = {$in: awardIds};
        }
        if (status) {
            tconditions["status"] = {"attachInfo.status": status};
        }
        let options = {
                sort: {createTime: -1},
                populate: [
                    {path: "user", model: "user", select: "-_id nickname openId"},
                    {path: "activity", model: "activity", select: "-_id title status awards"},
                    {path: "award", model: "award", select: "_id name type"}
                ],
                page: page,
                limit: limit
            },
            pageResult = await this.getPage<LottoDocument>(tconditions, options);

        let lottosDup = Utils.duplicate<any>(pageResult.docs);
        lottosDup.forEach((lotto: LottoDocument) => {
            let awardId = String(lotto.award._id);
            lotto["activity"]["awards"] = lotto.activity.awards.filter((item: any) => awardId === String(item.award));
        });
        pageResult["docs"] = lottosDup;
        return pageResult;
    }

    async getLottoCount(activityId: string, awardId: string): Promise<number> {
        if (!activityId) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动编号]`));
        if (!awardId) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[奖品编号]`));
        return await this.model.count({activity: activityId, award: awardId});
    }

    async addLotto(userId: string, activityId: string): Promise<UserDocument | null> {
        if (!userId) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[用户编号]`));
        if (!activityId) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动编号]`));

        let isFinished = await this.activityService.isFinished(activityId);
        if (isFinished) return Promise.reject(new BusinessError(ErrorType.Others.code, `${ErrorType.Others.message}:[活动已经结束]`));

        let lottoCount = await this.userService.getLottoCount(userId);
        if (lottoCount <= 0) return Promise.reject(new BusinessError(ErrorType.Others.code, `${ErrorType.Others.message}:[您的抽奖机会已经用完啦]`));

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
        if (!lotto) return Promise.reject(new BusinessError(ErrorType.Others.code, `${ErrorType.Others.message}:[抽奖数据创建失败]`));
        return await this.userService.setLottoCount(userId, -1);
    }

    async receiveLotto(id: string, attachInfo: any): Promise<LottoDocument> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[抽奖编号]`));
        return await this.model.findByIdAndUpdate(id, {
            $set: {
                attachInfo: attachInfo,
                updateTime: new Date()
            }
        }, {new: true});
    }

    async setStatus(id: string, status: number): Promise<LottoDocument> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[抽奖编号]`));
        return await this.model.findByIdAndUpdate(id, {
            $set: {
                "attachInfo.status": status,
                updateTime: new Date()
            }
        }, {new: true});
    }
};
