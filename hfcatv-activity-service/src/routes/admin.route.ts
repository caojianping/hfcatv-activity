import {BaseContext} from "koa";
import Router from 'koa-router';

export default (router: Router) => {
    router
        .post("/account/login", async (ctx: BaseContext, next: any) => await next())
        .post("/account/password", async (ctx: BaseContext, next: any) => await next());
}
