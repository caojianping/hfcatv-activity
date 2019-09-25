import {Context} from "koa";
import {ErrorType} from "../error";
import {LottoDocument} from "../models";
import {LottoService, UserService} from "../services";

const lottoService = new LottoService();
const userService = new UserService();

export default class LottoController {
	async execLotto(ctx: Context, next: Function) {
		let {openId, activityId} = ctx.request.body,
			userId = await userService.getUserIdByOpenId(openId),
			user = await lottoService.addLotto(userId, activityId);
		if (!user) ctx.failure(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[用户]`);
		else ctx.success({
			openId: user.openId,
			nickname: user.nickname,
			lottoCount: user.lottoCount
		});
	}

	async getPageLottosByOpenId(ctx: Context, next: Function) {
		let params = ctx.params,
			page = Number(params.page || 1),
			limit = Number(params.limit || 10),
			userId = await userService.getUserIdByOpenId(ctx.request.body.openId),
			conditions = {user: userId},
			options = {
				sort: {createTime: -1},
				populate: [
					{path: "user", model: "user", select: "openId nickname"},
					{path: "activity", model: "activity", select: "title status awards"},
					{path: "award", model: "award", select: "name type"}
				],
				page: page,
				limit: limit
			},
			result = await lottoService.getPage<LottoDocument>(conditions, options);
		ctx.success(result);
	}

	async receiveLotto(ctx: Context, next: Function) {
		let {id, attachInfo} = ctx.request.body,
			lotto = await lottoService.receiveLotto(id, attachInfo);
		ctx.success(lotto);
	}


	// for admin
	async getPageLottos(ctx: Context, next: Function) {
		let params = ctx.params,
			page = Number(params.page || 1),
			limit = Number(params.limit || 10),
			options = {
				sort: {createTime: -1},
				populate: [
					{path: "user", model: "user"},
					{path: "activity", model: "activity"},
					{path: "award", model: "award"}
				],
				page: page,
				limit: limit
			},
			result = await lottoService.getPage<LottoDocument>({}, options);
		ctx.success(result);
	}

	// for admin
	async setStatus(ctx: Context, next: Function) {
		let {id, status} = ctx.request.body,
			lotto = await lottoService.setStatus(id, status);
		ctx.success(lotto);
	}
};
