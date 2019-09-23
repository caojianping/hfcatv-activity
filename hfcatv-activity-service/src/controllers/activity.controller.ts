import {Context} from "koa";
import {ActivityService} from "../services";

const activityService = new ActivityService();

export default class ActivityController {
    async getActivity(ctx: Context, next: Function) {
        let activity = await activityService.getActivity();
        ctx.success(activity);
    }
};
