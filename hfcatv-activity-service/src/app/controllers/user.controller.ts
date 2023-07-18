/***
 * @file:
 * @author: caojianping
 * @Date: 2021-03-19 14:58:36
 */
import { Context } from "koa";
import { Console, Logger } from "../../common/logger";
import { ErrorType } from "../../error";
import { UserDocument } from "../interfaces";
import { UserService } from "../services";

const userService = new UserService();

export default class UserController {
  // for api：获取用户信息
  async getUser(ctx: Context, next: Function) {
    // let {unionId, openId, nickname} = ctx.request.body || {};
    let { openId, nickname } = ctx.request.body || {};
    Console.info("/api/user/detail openId, nickname:", openId, nickname);
    Logger.info("/api/user/detail openId, nickname:", openId, nickname);

    let user = await userService.getUserByWechat(openId, nickname);
    Console.info("/api/user/detail user:", user);
    Logger.info("/api/user/detail user:", user);
    if (!user) ctx.failure(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[用户]`);
    else
      ctx.success({
        // unionId: user.unionId,
        openId: user.openId,
        nickname: user.nickname,
        lottoCount: user.lottoCount,
      });
  }

  // for admin
  async getPageUsers(ctx: Context, next: Function) {
    let params = ctx.params || {},
      page = Number(params.page || 1),
      limit = Number(params.limit || 10),
      conditions = ctx.request.body || {},
      options = {
        sort: { createTime: -1 },
        page: page,
        limit: limit,
      },
      result = await userService.getPage<UserDocument>(conditions, options);
    ctx.success(result);
  }

  // for admin
  async setLottoCount(ctx: Context, next: Function) {
    let { id, lottoCount } = ctx.request.body || {},
      user = await userService.setLottoCount(id, lottoCount, false);
    ctx.success(user);
  }
}
