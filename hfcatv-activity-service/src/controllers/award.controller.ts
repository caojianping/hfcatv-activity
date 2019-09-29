import {Context} from "koa";
import {ErrorType} from "../error";
import {AwardDocument} from "../interfaces";
import {AwardService} from "../services";

const awardService = new AwardService();

export default class AwardController {
	async getAwards(ctx: Context, next: Function) {
		let awards = await awardService.getAwards();
		ctx.success(awards);
	}

	async getPageAwards(ctx: Context, next: Function) {
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
		let {name, type} = ctx.request.body,
			award = await awardService.addAward(name, type);
		if (!award) ctx.failure(ErrorType.DataAddFailed.code, `${ErrorType.DataAddFailed.message}:[奖品]`);
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
