/***
 * @file:
 * @author: caojianping
 * @Date: 2021-03-19 14:58:36
 */
import { Context } from "koa";
import { Console, Logger } from "../../common/logger";
import { ErrorType } from "../../error";
import { LottoService, UserService } from "../services";

const lottoService = new LottoService();
const userService = new UserService();

export default class LottoController {
  // for api：获取最近的中奖列表
  async getLastestLottos(ctx: Context, next: Function) {
    let lottos = await lottoService.getLastestLottos();
    ctx.success(lottos);
  }

  // for api：执行抽奖
  async execLotto(ctx: Context, next: Function) {
    // let {unionId, openId, activityId} = ctx.request.body || {};
    let { openId, activityId } = ctx.request.body || {};
    Console.info("/api/lotto/exec openId, activityId:", openId, activityId);
    Logger.info("/api/lotto/exec openId, activityId:", openId, activityId);

    // let userId = await userService.getUserIdByWechat(unionId, openId),
    let userId = await userService.getUserIdByWechat(openId),
      data = await lottoService.addLotto(userId, activityId);
    Console.info("/api/lotto/exec userId, data:", userId, data);
    Logger.info("/api/lotto/exec userId, data:", userId, data);
    if (!data) ctx.failure(ErrorType.DataAddFailed.code, `${ErrorType.DataAddFailed.message}:[中奖]`);
    else {
      data["lottos"] = await lottoService.getLastestLottos();
      ctx.success(data);
    }
  }

  // for api：根据奖品类型获取分页中奖列表
  async getPageLottosByWechat(ctx: Context, next: Function) {
    let params = ctx.params || {},
      page = Number(params.page || 1),
      limit = Number(params.limit || 10),
      // {unionId, openId, type} = ctx.request.body || {},
      { openId, type } = ctx.request.body || {};
    // userId = await userService.getUserIdByWechat(unionId, openId),
    Console.info("/api/lotto/list/:page/:limit page, limit, body:", page, limit, ctx.request.body);
    Logger.info("/api/lotto/list/:page/:limit page, limit, body:", page, limit, ctx.request.body);

    let userId = await userService.getUserIdByWechat(openId),
      result = await lottoService.getPageLottosByUserId(
        userId,
        type === undefined || type === null ? "*" : type,
        page,
        limit
      );
    ctx.success(result);
  }

  // for api：领奖
  async receiveLotto(ctx: Context, next: Function) {
    let { id, attachInfo } = ctx.request.body || {};
    Console.info("/api/lotto/receive id, attachInfo:", id, attachInfo);
    Logger.info("/api/lotto/receive id, attachInfo:", id, attachInfo);

    let lotto = await lottoService.receiveLotto(id, attachInfo);
    Console.info("/api/lotto/receive lotto:", lotto);
    Logger.info("/api/lotto/receive lotto:", lotto);
    ctx.success(lotto);
  }

  // for admin
  async getPageLottos(ctx: Context, next: Function) {
    let params = ctx.params || {},
      page = Number(params.page || 1),
      limit = Number(params.limit || 10),
      conditions = ctx.request.body || {};
    Console.info("/admin/lotto/list/:page/:limit page, limit, body:", page, limit, conditions);
    Logger.info("/admin/lotto/list/:page/:limit page, limit, body:", page, limit, conditions);

    let result = await lottoService.getPageLottos(conditions, page, limit);
    ctx.success(result);
  }

  // for admin
  async setStatus(ctx: Context, next: Function) {
    let { id, status } = ctx.request.body || {},
      lotto = await lottoService.setStatus(id, status);
    ctx.success(lotto);
  }

  // for admin
  async sendRedPacket(ctx: Context, next: Function) {
    let { id } = ctx.request.body || {},
      result = await lottoService.sendRedPacket(id);
    ctx.success(result);
  }
}
