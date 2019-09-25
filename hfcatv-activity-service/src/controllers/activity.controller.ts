import {Context} from "koa";
import {ErrorType} from "../error";
import {ActivityDocument} from "../models";
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
			options = {
				sort: {createTime: -1},
				page: page,
				limit: limit
			},
			result = await activityService.getPage<ActivityDocument>({}, options);
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
			id = data.id;
		delete data.id;

		let activity = await activityService.updateActivity({_id: id}, data);
		ctx.success(activity);
	}

	async removeActivity(ctx: Context, next: Function) {
		let id = ctx.request.body.id,
			result = await activityService.softDelete(id);
		ctx.success(result);
	}
};
