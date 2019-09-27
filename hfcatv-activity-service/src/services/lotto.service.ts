import {BusinessError, ErrorType} from "../error";
import {AwardType, GoodsStatus, RedPacketStatus} from "../common/enums";
import {AwardDocument, UserDocument, RedPacketInfo, GoodsInfo, MemberCardInfo, LottoDocument} from "../interfaces";
import {LottoModel} from "../models";
import {LottoHelper} from "../helpers";

import BaseService from "./base.service";
import UserService from "./user.service";
import ActivityService from "./activity.service";

export default class LottoService extends BaseService {
	private activityService: ActivityService = new ActivityService();
	private userService: UserService = new UserService();

	constructor() {
		super(LottoModel);
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
