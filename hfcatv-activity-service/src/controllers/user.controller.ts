import {Context} from "koa";
import {Console, Logger} from "../common/logger";
import {ErrorType} from "../error";
import {UserService} from "../services";

const userService = new UserService();

export default class UserController {
	async getUser(ctx: Context, next: Function) {
		let {openId, nickname} = ctx.request.body,
			user = await userService.getUserByConditions(openId, nickname);
		Console.info("/api/user/detail openId,nickname:", openId, nickname);
		Logger.info("/api/user/detail openId,nickname:", openId, nickname);
		if (!user) ctx.failure(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[用户]`);
		else ctx.success({
			openId: user.openId,
			nickname: user.nickname,
			lottoCount: user.lottoCount
		});
	}
};
