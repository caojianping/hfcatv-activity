import {Context} from "koa";
import {ErrorType} from "../error";
import {ActivityDocument} from "../interfaces";
import {ActivityService} from "../services";

const activityService = new ActivityService();

export default class ActivityController {
	async getActivity(ctx: Context, next: Function) {
		let activity = await activityService.getActivity();
		ctx.success(activity);
	}
	
	async getPageActivities(ctx: Context, next: Function) {
		let params = ctx.params,
			page = Number(params.page || 1),
			limit = Number(params.limit || 10),
			conditions = ctx.request.body || {},
			options = {
				sort: {createTime: -1},
				page: page,
				limit: limit
			},
			result = await activityService.getPage<ActivityDocument>(conditions, options);
		ctx.success(result);
	}

	async addActivity(ctx: Context, next: Function) {
		let data = ctx.request.body,
			activity = await activityService.addActivity(data);
		if (!activity) ctx.failure(ErrorType.DataAddFailed.code, `${ErrorType.DataAddFailed.message}:[活动]`);
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
