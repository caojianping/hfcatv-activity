import {PaginateResult} from "mongoose";
import {BusinessError, ErrorType} from "../error";
import {Utils} from "../common/utils";
import {AwardType, GoodsStatus, RedPacketStatus} from "../common/enums";
import {
    AwardDocument, LottoDocument, ActivityAwardDocument,
    MemberCardInfo, RedPacketInfo, GoodsInfo
} from "../interfaces";
import {LottoModel} from "../models";
import {LottoHelper, AwardHelper} from "../helpers";

import BaseService from "./base.service";
import UserService from "./user.service";
import ActivityService from "./activity.service";

export default class LottoService extends BaseService {
    private activityService: ActivityService = new ActivityService();
    private userService: UserService = new UserService();
    private populates: Array<any> = [
        {path: "user", model: "user", select: "-_id nickname openId"},
        {
            path: "activity", model: "activity", select: "-_id title status awards",
            populate: {path: "awards.award", model: "award"}
        }
    ];

    constructor() {
        super(LottoModel);
    }

    private _buildLotto(lotto: LottoDocument<ActivityAwardDocument>, isBase: boolean = false) {
        let lottoDup = Utils.duplicate<any>(lotto),
            activityAward = lottoDup.activity.awards
                .filter((activityAward: ActivityAwardDocument) => String(lottoDup.award) === String(activityAward.award._id))[0];

        delete lottoDup.activity.awards;
        lottoDup["activity"] = lottoDup.activity;
        lottoDup["award"] = AwardHelper.convertToAwardVO(activityAward, isBase);
        return lottoDup;
    }

    private _buildLottos(lottos: Array<LottoDocument<ActivityAwardDocument>>, isBase: boolean = false) {
        let self = this,
            result: Array<any> = [];
        lottos.forEach((lotto: LottoDocument<ActivityAwardDocument>) => {
            let data = self._buildLotto(lotto, isBase);
            result.push(data);
        });
        return result;
    }


    async getLastestLottos(): Promise<Array<any>> {
        let options = {
                sort: {createTime: -1},
                populate: this.populates,
                page: 1,
                limit: 10
            },
            result = await this.getPage<LottoDocument<ActivityAwardDocument>>({}, options);
        return this._buildLottos(result.docs, true);
    }

    async getPageLottosByUserId(userId: string, page: number, limit: number): Promise<PaginateResult<any>> {
        if (!userId) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[用户编号]`));

        let conditions = {user: userId},
            options = {
                sort: {createTime: -1},
                populate: this.populates,
                page: page,
                limit: limit
            },
            result = await this.getPage<LottoDocument<ActivityAwardDocument>>(conditions, options);
        result["docs"] = this._buildLottos(result.docs, true);
        return result;
    }

    async getPageLottosByConditions(conditions: any, page: number, limit: number): Promise<PaginateResult<any>> {
        if (!conditions) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[查询条件]`));

        let tconditions = {},
            {nickname, title, type, status} = conditions;
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
                populate: this.populates,
                page: page,
                limit: limit
            },
            result = await this.getPage<LottoDocument<ActivityAwardDocument>>(tconditions, options);
        result["docs"] = this._buildLottos(result.docs, true);
        return result;
    }

    async getLottoCount(activityId: string, awardId: string): Promise<number> {
        if (!activityId) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动编号]`));
        if (!awardId) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[奖品编号]`));
        return await this.model.count({activity: activityId, award: awardId});
    }

    async addLotto(userId: string, activityId: string): Promise<any> {
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

        let user = await this.userService.setLottoCount(userId, -1);
        return {
            lottoCount: user.lottoCount,
            awardId: award._id
        };
    }

    async receiveLotto(id: string, attachInfo: any): Promise<LottoDocument<ActivityAwardDocument>> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[抽奖编号]`));
        return await this.model.findByIdAndUpdate(id, {
            $set: {
                attachInfo: attachInfo,
                updateTime: new Date()
            }
        }, {new: true});
    }

    async setStatus(id: string, status: number): Promise<LottoDocument<ActivityAwardDocument>> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[抽奖编号]`));
        return await this.model.findByIdAndUpdate(id, {
            $set: {
                "attachInfo.status": status,
                updateTime: new Date()
            }
        }, {new: true});
    }
};
