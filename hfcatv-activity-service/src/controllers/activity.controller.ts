import {Context} from "koa";
import {ActivityService} from "../services";

const activityService = new ActivityService();

export default class ActivityController {
    async getActivity(ctx: Context, next: Function) {
        let activity = await activityService.getActivity();
        ctx.success(activity);
    }

    async addActivity(ctx: Context, next: Function) {
    }

    async updateActivity(ctx: Context, next: Function) {
    }

    async removeActivity(ctx: Context, next: Function) {
    }
};
