import {Context} from "koa";
import {ErrorType, BusinessError} from "../error";
import {UserService} from "../services";

const userService = new UserService();

export default class UserController {
    async getUser(ctx: Context, next: Function) {
        let body = ctx.params,
            {openId, nickname} = body,
            user = await userService.getUserByConditions(openId, nickname);
        if (!user) throw new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[用户]`);

        ctx.success({
            openId: user.openId,
            nickname: user.nickname,
            lottoCount: user.lottoCount
        });
    }
};
