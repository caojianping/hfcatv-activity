import {Context} from "koa";

export default class UserController {
    async test(ctx: Context, next: Function) {
        await next();
    }
};
