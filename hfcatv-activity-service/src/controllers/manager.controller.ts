import {Context} from "koa";

export default class ManagerController {
    async login(ctx: Context, next: Function) {
        await next();
    }

    async setPassword(ctx: Context, next: Function){

    }
};
