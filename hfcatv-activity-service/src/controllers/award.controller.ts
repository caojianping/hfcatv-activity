import {Context} from "koa";
import {ErrorType} from "../error";
import {AwardDocument} from "../interfaces";
import {AwardService} from "../services";

const awardService = new AwardService();

export default class AwardController {
	async getAwardTypes(ctx: Context, next: Function) {
		ctx.success([
			{type: "*", value: "全部类型"},
			{type: 1, value: "充值卡券"},
			{type: 2, value: "现金红包"},
			{type: 3, value: "线下办"},
			{type: 4, value: "观影券"}
		]);
	}
	
	async getAwards(ctx: Context, next: Function) {
		let awards = await awardService.getAwards();
		ctx.success(awards);
	}

	async getPageAwardsByConditions(ctx: Context, next: Function) {
		let params = ctx.params,
			page = Number(params.page || 1),
			limit = Number(params.limit || 10),
			conditions = ctx.request.body || {},
			options = {
				sort: {createTime: -1},
				page: page,
				limit: limit
			},
			result = await awardService.getPage<AwardDocument>(conditions, options);
		ctx.success(result);
	}

	async addAward(ctx: Context, next: Function) {
		let {name, type, minimum, maximum} = ctx.request.body,
			award = await awardService.addAward(name, type, minimum, maximum);
		if (!award) ctx.failure(ErrorType.DataAddFailed.code, `${ErrorType.DataAddFailed.message}:[奖品信息]`);
		else ctx.success(award);
	}

	async updateAward(ctx: Context, next: Function) {
		let data = ctx.request.body,
			id = data._id;
		delete data._id;

		let award = await awardService.updateAward(id, data);
		ctx.success(award);
	}

	async removeAward(ctx: Context, next: Function) {
		let id = ctx.request.body.id,
			result = await awardService.softDelete(id);
		ctx.success(result);
	}
};
