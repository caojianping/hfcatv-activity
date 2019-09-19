import {Context} from "koa";
import Router from 'koa-router';

export default (router: Router) => {
    return router
        .post("/account/login", async (ctx: Context, next: Function) => await next())
        .post("/account/password", async (ctx: Context, next: Function) => await next());
};
