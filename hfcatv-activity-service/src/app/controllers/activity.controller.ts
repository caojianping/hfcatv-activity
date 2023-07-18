import { Context } from "koa";
import { ErrorType } from "../../error";
import { ActivityService } from "../services";
import { Console, Logger } from "../../common/logger";

const activityService = new ActivityService();

export default class ActivityController {
  // for api：获取活动信息
  async getActivity(ctx: Context, next: Function) {
    let activity = await activityService.getActivity();
    ctx.success(activity);
  }

  // for admin
  async getPageActivities(ctx: Context, next: Function) {
    let params = ctx.params || {},
      page = Number(params.page || 1),
      limit = Number(params.limit || 10),
      conditions = ctx.request.body || {},
      result = await activityService.getPageActivities(conditions, page, limit);
    ctx.success(result);
  }

  // for admin
  async addActivity(ctx: Context, next: Function) {
    let activity = await activityService.addActivity(ctx.request.body || {});
    if (!activity) ctx.failure(ErrorType.DataAddFailed.code, `${ErrorType.DataAddFailed.message}:[活动]`);
    else ctx.success(activity);
  }

  // for admin
  async updateActivity(ctx: Context, next: Function) {
    let data = ctx.request.body || {},
      id = data._id;
    delete data._id;

    let activity = await activityService.updateActivity(id, data);
    ctx.success(activity);
  }

  // for admin
  async removeActivity(ctx: Context, next: Function) {
    let { id } = ctx.request.body || {},
      result = await activityService.softDelete(id);
    ctx.success(result);
  }

  // for admin
  async setSwitch(ctx: Context, next: Function) {
    let { id, switch: switcher } = ctx.request.body || {},
      result = await activityService.setSwitch(id, switcher);
    ctx.success(result);
  }

  // for admin
  async setAward(ctx: Context, next: Function) {
    let { id, award } = ctx.request.body || {};
    Console.info("/admin/activity/setAward id, award:", id, award);
    Logger.info("/admin/activity/setAward id, award:", id, award);

    let result = await activityService.setAward(id, award);
    ctx.success(result);
  }

  // for admin
  async removeAward(ctx: Context, next: Function) {
    let { id, awardId } = ctx.request.body || {},
      result = await activityService.removeAward(id, awardId);
    ctx.success(result);
  }
}
