import {Context} from "koa";
import {ErrorType} from "../error";
import {LottoService, UserService} from "../services";

const lottoService = new LottoService();
const userService = new UserService();

export default class LottoController {
    async execLotto(ctx: Context, next: Function) {
        let {openId, activityId} = ctx.request.body,
            userId = await userService.getUserIdByOpenId(openId),
            data = await lottoService.addLotto(userId, activityId);
        if (!data) ctx.failure(ErrorType.DataAddFailed.code, `${ErrorType.DataAddFailed.message}:[中奖信息]`);
        else {
            data["lottos"] = await lottoService.getLastestLottos();
            ctx.success(data);
        }
    }

    async getPageLottosByOpenId(ctx: Context, next: Function) {
        let params = ctx.params,
            page = Number(params.page || 1),
            limit = Number(params.limit || 10),
            {openId, status} = ctx.request.body,
            userId = await userService.getUserIdByOpenId(openId),
            result = await lottoService.getPageLottosByUserId(userId, status || 1, page, limit);
        ctx.success(result);
    }

    async receiveLotto(ctx: Context, next: Function) {
        let {id, attachInfo} = ctx.request.body,
            lotto = await lottoService.receiveLotto(id, attachInfo);
        ctx.success(lotto);
    }


    // for admin
    async getPageLottosByConditions(ctx: Context, next: Function) {
        let params = ctx.params,
            page = Number(params.page || 1),
            limit = Number(params.limit || 10),
            conditions = ctx.request.body || {},
            result = await lottoService.getPageLottosByConditions(conditions, page, limit);
        ctx.success(result);
    }

    // for admin
    async setStatus(ctx: Context, next: Function) {
        let {id, status} = ctx.request.body,
            lotto = await lottoService.setStatus(id, status);
        ctx.success(lotto);
    }
};
