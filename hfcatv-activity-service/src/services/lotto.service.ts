import {PaginateResult} from "mongoose";
import {BusinessError, ErrorType} from "../error";
import {Utils} from "../common/utils";
import {AwardType, GoodsStatus, RedPacketStatus} from "../common/enums";
import {
    AwardDocument, LottoDocument, AwardDetailDocument,
    MemberCardInfo, RedPacketInfo, GoodsInfo, AwardBaseVO, AwardVO
} from "../interfaces";
import {LottoModel} from "../models";
import {LottoHelper, AwardHelper} from "../helpers";

import BaseService from "./base.service";
import UserService from "./user.service";
import AwardService from "./award.service";
import ActivityService from "./activity.service";

const StatusConfigs = {
    1: [0],			// 未领取
    2: [1, 2, 3],	// 已领取：包含了待发放、已领取 或者 待发货、发货中、已收货状等状态
    3: [-3, -2, -1] // 已过期：包含了已驳回、已过期、处理失败三种状态的信息
};

export default class LottoService extends BaseService {
    private userService: UserService = new UserService();
    private awardService: AwardService = new AwardService();
    private activityService: ActivityService = new ActivityService();

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

    private _buildLotto(lotto: LottoDocument<AwardDetailDocument, AwardDocument>, isBase: boolean = false) {
        let lottoDup = Utils.duplicate<any>(lotto),
            awardDetail = lottoDup.activity.awards
                .filter((awardDetail: AwardDetailDocument) =>
                    String(lottoDup.award) === String(awardDetail.award._id))[0];

        delete lottoDup.activity.awards;
        lottoDup["activity"] = lottoDup.activity;
        lottoDup["award"] = AwardHelper.convertToAwardVO(awardDetail, isBase);
        return lottoDup;
    }

    private _buildLottos(lottos: Array<LottoDocument<AwardDetailDocument, AwardDocument>>, isBase: boolean = false) {
        let self = this,
            result: Array<any> = [];
        lottos.forEach((lotto: LottoDocument<AwardDetailDocument, AwardDocument>) => {
            let data = self._buildLotto(lotto, isBase);
            result.push(data);
        });
        return result;
    }


    async getLastestLottos(): Promise<Array<LottoDocument<any, AwardBaseVO>>> {
        let options = {
                sort: {createTime: -1},
                populate: this.populates,
                page: 1,
                limit: 10
            },
            result: any = await this.getPage<LottoDocument<AwardDetailDocument, AwardDocument>>({}, options);
        return this._buildLottos(result.docs, true);
    }

    async getPageLottosByUserId(userId: string, status: number, page: number, limit: number)
        : Promise<PaginateResult<LottoDocument<any, AwardBaseVO>>> {
        if (!userId) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[用户编号]`));
        if ([1, 2, 3].indexOf(status) < 0) return Promise.reject(new BusinessError(ErrorType.InvalidType.code, `${ErrorType.InvalidType.message}:[中奖状态]`));

        let conditions = {
                user: userId,
                "attachInfo.status": {$in: StatusConfigs[status]}
            },
            options = {
                sort: {createTime: -1},
                populate: this.populates,
                page: page,
                limit: limit
            },
            result: any = await this.getPage<LottoDocument<AwardDetailDocument, AwardDocument>>(conditions, options);
        result["docs"] = this._buildLottos(result.docs, true);
        return result;
    }

    async getPageLottosByConditions(conditions: any, page: number, limit: number)
        : Promise<PaginateResult<LottoDocument<any, AwardVO>>> {
        if (!conditions) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[查询条件]`));

        let tconditions = {},
            {nickname, title, type, status} = conditions;
        if (nickname) {
            let userIds = await this.userService.getUserIdsByNickname(nickname);
            if (userIds.length > 0) {
                tconditions["user"] = {$in: userIds};
            }
        }
        if (title) {
            let activityIds = await this.activityService.getActivityIdsByTitle(title);
            if (activityIds.length > 0) {
                tconditions["activity"] = {$in: activityIds};
            }
        }
        if (type) {
            let awardIds = await this.awardService.getAwardIdsByType(type);
            if (awardIds.length > 0) {
                tconditions["award"] = {$in: awardIds};
            }
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
            result: any = await this.getPage<LottoDocument<AwardDetailDocument, AwardDocument>>(tconditions, options);
        result["docs"] = this._buildLottos(result.docs, false);
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
            awardId = award._id,
            awardType = award.type;
        if (awardType === AwardType.Nothing) {
            attachInfo = undefined;
        } else if (awardType === AwardType.RedPacket) {
            let minimum = award.minimum,
                maximum = award.maximum;
            attachInfo = <RedPacketInfo>{
                amount: LottoHelper.getRandomRedPacket(minimum, maximum),
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
            award: awardId,
            attachInfo: attachInfo
        });
        if (!lotto) return null;

        let result = await this.activityService.reduceStock(activityId, awardId);
        if (!result) return Promise.reject(new BusinessError(ErrorType.Others.code, `${ErrorType.Others.message}:[奖品库存处理失败]`));

        let user = await this.userService.setLottoCount(userId, -1);
        return {lottoCount: user.lottoCount, awardId: awardId};
    }

    async receiveLotto(id: string, attachInfo: any): Promise<LottoDocument<AwardDetailDocument, AwardBaseVO>> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[抽奖编号]`));
        if (!attachInfo) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[附加信息]`));

        let lotto = await this.model.findById(id);
        if (!lotto) return Promise.reject(new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[中奖信息]`));

        let lottoAttachInfo = lotto.attachInfo;
        for (let key in lottoAttachInfo) {
            if (attachInfo.hasOwnProperty(key)) {
                lottoAttachInfo[key] = attachInfo[key];
            }
        }

        let update = {
                $set: {
                    attachInfo: lottoAttachInfo,
                    updateTime: new Date()
                }
            },
            doc = await this.model.findByIdAndUpdate(id, update, {new: true}).populate(this.populates);
        if (!doc) return Promise.reject(new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[中奖信息]`));
        return this._buildLotto(doc, true);
    }

    async setStatus(id: string, status: number): Promise<LottoDocument<AwardDetailDocument, AwardVO>> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[抽奖编号]`));

        let update = {
                $set: {
                    "attachInfo.status": status,
                    updateTime: new Date()
                }
            },
            doc = await this.model.findByIdAndUpdate(id, update, {new: true}).populate(this.populates);
        if (!doc) return Promise.reject(new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[中奖信息]`));
        return this._buildLotto(doc, false);
    }
};
