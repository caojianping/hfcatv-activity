import {PaginateResult} from "mongoose";
import uuidv1 from "uuid/v1";
import {BusinessError, ErrorType} from "../error";
import {Utils} from "../common/utils";
import {AwardType, CardStatus, RedPacketStatus, GoodsStatus, MovieTicketStatus} from "../common/enums";
import {
	AwardDocument, AwardDetailDocument, AwardBaseVO, AwardVO,
	LottoDocument, CardInfo, GoodsInfo
} from "../interfaces";
import {LottoModel} from "../models";
import {AwardHelper, LottoHelper} from "../helpers";

import BaseService from "./base.service";
import UserService from "./user.service";
import AwardService from "./award.service";
import ActivityService from "./activity.service";
import {AwardTypeWithoutNothingKeys} from "../common/keys";

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

	async getPageLottosByUserId(userId: string, type: number | string, page: number, limit: number): Promise<PaginateResult<LottoDocument<any, AwardBaseVO>>> {
		if (!userId) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[用户编号]`));

		let conditions = {user: userId};
		if (typeof type === "string") {
			if (type !== "*") return Promise.reject(new BusinessError(ErrorType.InvalidType.code, `${ErrorType.InvalidType.message}:[奖品类型]`));
		} else if (typeof type === "number") {
			if (AwardTypeWithoutNothingKeys.indexOf(type) < 0) return Promise.reject(new BusinessError(ErrorType.InvalidType.code, `${ErrorType.InvalidType.message}:[奖品类型]`));
			else {
				let awardIds = await this.awardService.getAwardIdsByType(type);
				if (awardIds.length > 0) {
					conditions["award"] = {$in: awardIds};
				}
			}
		}

		let options = {
				sort: {createTime: -1},
				populate: this.populates,
				page: page,
				limit: limit
			},
			result: any = await this.getPage<LottoDocument<AwardDetailDocument, AwardDocument>>(conditions, options);
		result["docs"] = this._buildLottos(result.docs, true);
		return result;
	}

	async getPageLottosByConditions(conditions: any, page: number, limit: number): Promise<PaginateResult<LottoDocument<any, AwardVO>>> {
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
			tconditions["status"] = status;
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

	async addLotto(userId: string, activityId: string): Promise<any> {
		if (!userId) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[用户编号]`));
		if (!activityId) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动编号]`));

		let isFinished = await this.activityService.isFinished(activityId);
		if (isFinished) return Promise.reject(new BusinessError(ErrorType.Others.code, `${ErrorType.Others.message}:[活动已经结束]`));

		let lottoCount = await this.userService.getLottoCount(userId);
		if (lottoCount <= 0) return Promise.reject(new BusinessError(ErrorType.LottoNoneCount.code, ErrorType.LottoNoneCount.message));

		let status = undefined,
			amount = undefined,
			attachInfo: CardInfo | GoodsInfo | undefined = undefined;

		let award: AwardDocument = await LottoHelper.getRandomAward(activityId),
			awardId = award._id,
			awardType = award.type;
		console.log("getRandomAward:", award);
		if (awardType === AwardType.Card) {
			status = CardStatus.Default;
			amount = award.value;
			attachInfo = <CardInfo>{code: uuidv1()};
		} else if (awardType === AwardType.RedPacket) {
			let ranges = award.ranges;
			if (!ranges || ranges.length !== 2) return Promise.reject(new BusinessError(ErrorType.Others.code, `${ErrorType.Others.message}:红包配置`));

			status = RedPacketStatus.Default;
			amount = LottoHelper.getRandomRedPacket(ranges[0], ranges[1]);
		} else if (awardType === AwardType.Goods) {
			status = GoodsStatus.Default;
			amount = award.value;
			attachInfo = <GoodsInfo>{
				name: "",
				mobile: "",
				address: ""
			};
		} else if (awardType === AwardType.MovieTicket) {
			status = MovieTicketStatus.Default;
			amount = award.value;
		}

		let lotto = await this.model.create({
			user: userId,
			activity: activityId,
			award: awardId,
			status: status,
			amount: amount,
			attachInfo: attachInfo,
			createTime: new Date()
		});
		if (!lotto) return null;

		let result = await this.activityService.reduceStock(activityId, awardId);
		if (!result) return Promise.reject(new BusinessError(ErrorType.Others.code, `${ErrorType.Others.message}:[奖品库存处理失败]`));

		let user = await this.userService.setLottoCount(userId, -1);
		return {lottoCount: user.lottoCount, awardId: awardId};
	}

	async receiveLotto(id: string, attachInfo: any): Promise<LottoDocument<AwardDetailDocument, AwardBaseVO>> {
		if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[中奖编号]`));

		let lotto = await this.model.findById(id).populate(this.populates);
		if (!lotto) return Promise.reject(new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[中奖]`));

		let award = lotto.award;
		if (!award) return Promise.reject(new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[中奖奖品]`));

		let update = {updateTime: new Date()},
			{status, createTime} = lotto,
			{type, expire} = award;
		if (type === AwardType.Card) {
			return Promise.reject(new BusinessError(ErrorType.LottoForbidReceive.code, `${ErrorType.LottoForbidReceive.message}:[充值卡券]`));
		} else if (type === AwardType.RedPacket) {
			if (status !== RedPacketStatus.Default)
				return Promise.reject(new BusinessError(ErrorType.LottoForbidReceive.code, `${ErrorType.LottoForbidReceive.message}:[现金红包]`));

			let result = await this.setExpired(id, createTime, expire);
			if (result) return Promise.reject(new BusinessError(ErrorType.LottoExpired.code, ErrorType.LottoExpired.message));

			update["status"] = RedPacketStatus.UnSended;
		} else if (type === AwardType.Goods) {
			if (!attachInfo)
				return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[附加信息]`));

			if (status !== GoodsStatus.Default)
				return Promise.reject(new BusinessError(ErrorType.LottoForbidReceive.code, `${ErrorType.LottoForbidReceive.message}:[实物礼品]`));

			let result = await this.setExpired(id, createTime, expire);
			if (result) return Promise.reject(new BusinessError(ErrorType.LottoExpired.code, ErrorType.LottoExpired.message));

			update["status"] = GoodsStatus.UnSended;
			let updateAttachInfo = lotto.attachInfo;
			for (let key in updateAttachInfo) {
				if (attachInfo.hasOwnProperty(key)) {
					updateAttachInfo[key] = attachInfo[key];
				}
			}
			update["attachInfo"] = updateAttachInfo;
		} else if (type === AwardType.MovieTicket) {
			return Promise.reject(new BusinessError(ErrorType.Others.code, `${ErrorType.Others.message}:[待接入点播记录接口]`));
			// todo: 调用合肥有线点播记录接口，如果有消费记录，则直接发送红包；如果没有，则提示先去点播，再进行使用；
			// update["status"] = MovieTicketStatus.Used;
		} else {
			return Promise.reject(new BusinessError(ErrorType.Others.code, `${ErrorType.Others.message}:[未中奖，无需领取]`));
		}

		let doc = await this.model.findByIdAndUpdate(id, {$set: update}, {new: true}).populate(this.populates);
		if (!doc) return Promise.reject(new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[中奖]`));
		return this._buildLotto(doc, true);
	}

	async setExpired(id: string, createTime: Date, expire?: number | Array<Date>): Promise<boolean> {
		if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[中奖编号]`));

		let result = LottoHelper.isExpired(createTime, expire);
		if (result) {
			let update = {status: -2, updateTime: new Date()},
				doc = await this.model.findByIdAndUpdate(id, {$set: update}, {new: true}).populate(this.populates);
			if (!doc) return Promise.reject(new BusinessError(ErrorType.DataUpdateFailed.code, `${ErrorType.DataUpdateFailed.message}:[中奖状态]`));
		}
		return result;
	}

	async setStatus(id: string, status: number): Promise<LottoDocument<AwardDetailDocument, AwardVO>> {
		if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[中奖编号]`));

		let update = {
				$set: {
					"attachInfo.status": status,
					updateTime: new Date()
				}
			},
			doc = await this.model.findByIdAndUpdate(id, update, {new: true}).populate(this.populates);
		if (!doc) return Promise.reject(new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[中奖]`));
		return this._buildLotto(doc, false);
	}

	async sendRedPacket(id: string): Promise<boolean> {
		if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[抽奖编号]`));

		let result = await this.isExist({_id: id});
		if (!result.status) return Promise.reject(new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[中奖信息]`));

		let data = result.data,
			openId = await this.userService.getOpenIdByUserId(data.user),
			money = Number((data.attachInfo.amount * 100).toFixed(2));
		if (isNaN(money) || money <= 0) return Promise.reject(new BusinessError(ErrorType.Others.code, `${ErrorType.Others.message}:[无效的红包金额]`));

		try {
			// let wxPay = require("../wechat/weixinPay.js");
			// await wxPay.sendRedPacket(openId, money, "合肥有线活动抽奖现场", null, "合肥有线抽奖活动，现金奖红包");

			let update = {
					"attachInfo.status": RedPacketStatus.Received,
					updateTime: new Date()
				},
				doc = await this.model.findByIdAndUpdate(id, {$set: update}, {new: true}).populate(this.populates);
			if (!doc) return Promise.reject(new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[中奖信息]`));
			return this._buildLotto(doc, false);
		} catch (err) {
			console.log("红包发放错误：", err);
			let message = typeof err === "string" ? err : JSON.stringify(err),
				update = {
					"attachInfo.status": RedPacketStatus.SendFailed,
					"attachInfo.message": message,
					updateTime: new Date()
				};
			await this.model.findByIdAndUpdate(id, {$set: update}, {new: true});
			return Promise.reject(err);
		}
	}
};
