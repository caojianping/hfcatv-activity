import {Context} from "koa";
import {ErrorType} from "../error";
import {ActivityService} from "../services";

const activityService = new ActivityService();

export default class ActivityController {
    async getActivity(ctx: Context, next: Function) {
        let activity = await activityService.getActivity();
        ctx.success(activity);
    }

    async getPageActivitiesByConditions(ctx: Context, next: Function) {
        let params = ctx.params,
            page = Number(params.page || 1),
            limit = Number(params.limit || 10),
            conditions = ctx.request.body || {},
            result = await activityService.getPageActivitiesByConditions(conditions, page, limit);
        ctx.success(result);
    }

    async addActivity(ctx: Context, next: Function) {
        let activity = await activityService.addActivity(ctx.request.body);
        if (!activity) ctx.failure(ErrorType.DataAddFailed.code, `${ErrorType.DataAddFailed.message}:[活动信息]`);
        else ctx.success(activity);
    }

    async updateActivity(ctx: Context, next: Function) {
        let data = ctx.request.body,
            id = data._id;
        delete data._id;

        let activity = await activityService.updateActivity(id, data);
        ctx.success(activity);
    }

    async removeActivity(ctx: Context, next: Function) {
        let id = ctx.request.body.id,
            result = await activityService.softDelete(id);
        ctx.success(result);
    }
};
