/***
 * @file:
 * @author: caojianping
 * @Date: 2021-03-19 14:58:36
 */
import { Context } from "koa";
import { ErrorType } from "../../error";
import { ManagerDocument } from "../interfaces";
import { ManagerService } from "../services";

const managerService = new ManagerService();

export default class ManagerController {
  // for admin
  async getPageManagers(ctx: Context, next: Function) {
    let params = ctx.params || {},
      page = Number(params.page || 1),
      limit = Number(params.limit || 10),
      conditions = ctx.request.body || {},
      options = {
        sort: { createTime: -1 },
        page: page,
        limit: limit,
      },
      result = await managerService.getPage<ManagerDocument>(conditions, options);
    ctx.success(result);
  }

  // for admin
  async addManager(ctx: Context, next: Function) {
    let manager = await managerService.addManager(ctx.request.body || {});
    if (!manager) ctx.failure(ErrorType.DataAddFailed.code, `${ErrorType.DataAddFailed.message}:[活动]`);
    else ctx.success(manager);
  }

  // for admin
  async updateManager(ctx: Context, next: Function) {
    let data = ctx.request.body || {},
      id = data._id;
    delete data._id;

    let manager = await managerService.updateManager(id, data);
    ctx.success(manager);
  }

  // for admin
  async removeManager(ctx: Context, next: Function) {
    let { id } = ctx.request.body || {},
      result = await managerService.softDelete(id);
    ctx.success(result);
  }

  // for admin
  async resetPassword(ctx: Context, next: Function) {
    let { id } = ctx.request.body || {},
      result = await managerService.resetPassword(id);
    ctx.success(!!result);
  }
}
