import {Context} from "koa";
import {ErrorType, BusinessError} from "../error";
import {UserService} from "../services";

const userService = new UserService();

export default class UserController {
    async addUser(ctx: Context, next: Function) {
        let body = ctx.request.body || {},
            {openId, nickname} = body,
            user = await userService.addUser(openId, nickname);
        if (!user) throw new BusinessError(ErrorType.Others.code, `${ErrorType.Others.message}:[用户数据创建失败]`);

        ctx.success({
            openId: openId,
            nickname: nickname,
            lottoCount: user.lottoCount
        });
    }
};
