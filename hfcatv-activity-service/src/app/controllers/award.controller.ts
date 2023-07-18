/***
 * @file:
 * @author: caojianping
 * @Date: 2021-03-19 14:58:36
 */
import { Context } from "koa";
import { AwardType } from "../../common/enums";
import { ErrorType } from "../../error";
import { AwardDocument } from "../interfaces";
import { AwardService } from "../services";

const awardService = new AwardService();

export default class AwardController {
  // for api：获取奖品类型列表
  async getAwardTypes(ctx: Context, next: Function) {
    ctx.success([
      { type: "*", value: "全部类型" },
      { type: AwardType.RedPacket, value: "现金红包" },
      { type: AwardType.MovieTicket, value: "观影券" },
      { type: AwardType.Card, value: "充值卡" },
      // {type: AwardType.Goods, value: "线下办"},
      { type: AwardType.Goods, value: "营业厅办理" },
    ]);
  }

  // for admin
  async getAwards(ctx: Context, next: Function) {
    let awards = await awardService.getAwards();
    ctx.success(awards);
  }

  // for admin
  async getPageAwards(ctx: Context, next: Function) {
    let params = ctx.params || {},
      page = Number(params.page || 1),
      limit = Number(params.limit || 10),
      conditions = ctx.request.body || {},
      options = {
        sort: { createTime: -1 },
        page: page,
        limit: limit,
      },
      result = await awardService.getPage<AwardDocument>(conditions, options);
    ctx.success(result);
  }

  // for admin
  async addAward(ctx: Context, next: Function) {
    let award = await awardService.addAward(ctx.request.body || {});
    if (!award) ctx.failure(ErrorType.DataAddFailed.code, `${ErrorType.DataAddFailed.message}:[奖品]`);
    else ctx.success(award);
  }

  // for admin
  async updateAward(ctx: Context, next: Function) {
    let data = ctx.request.body || {},
      id = data._id;
    delete data._id;

    let award = await awardService.updateAward(id, data);
    ctx.success(award);
  }

  // for admin
  async removeAward(ctx: Context, next: Function) {
    let { id } = ctx.request.body || {},
      result = await awardService.softDelete(id);
    ctx.success(result);
  }
}
