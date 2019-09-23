import {Context} from "koa";
import {ErrorType, BusinessError} from "../error";
import {LottoDocument} from "../models";
import {LottoService, UserService} from "../services";

const lottoService = new LottoService();
const userService = new UserService();

export default class LottoController {
    async addLotto(ctx: Context, next: Function) {
        console.log("111", ctx.request.body);
        let {openId, activityId} = ctx.request.body,
            userId = await userService.getUserIdByOpenId(openId),
            user = await lottoService.addLotto(userId, activityId);
        if (!user) throw new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[用户]`);

        ctx.success({
            openId: user.openId,
            nickname: user.nickname,
            lottoCount: user.lottoCount
        });
    }

    async getLottos(ctx: Context, next: Function) {
        let params = ctx.params,
            page = Number(params.page || 1),
            limit = Number(params.limit || 10),
            userId = await userService.getUserIdByOpenId(ctx.request.body.openId),
            result = await lottoService.getPage<LottoDocument>(
                {user: userId}, {
                    sort: {createTime: -1},
                    populate: [
                        {path: "user", model: "user", select: "openId nickname"},
                        {path: "activity", model: "activity", select: "title status awards"},
                        {path: "award", model: "award", select: "name type"}
                    ],
                    page: page,
                    limit: limit
                });
        ctx.success(result);
    }
};
