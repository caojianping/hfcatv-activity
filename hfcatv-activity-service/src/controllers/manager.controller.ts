import {Context} from "koa";

export default class ManagerController {
    async register(ctx: Context, next: Function) {
        await next();
    }

    async login(ctx: Context, next: Function) {
        await next();
    }
};
