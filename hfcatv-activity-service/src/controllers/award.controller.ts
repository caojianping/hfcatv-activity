import {Context} from "koa";

export default class AwardController {
    async test(ctx: Context, next: Function) {
        await next();
    }
};
