import {Context} from "koa";
import Router from "koa-router";
import {BusinessError, ErrorCode} from "../error/";

export default (router: Router) => {
    return router
        .get("/action01", async (ctx: Context, next: Function) => {
            ctx.success({id: 1, name: "cjp"});
        })
        .get("/action02", async (ctx: Context, next: Function) => {
            throw new Error("这是一个系统异常");
        })
        .get("/action03", async (ctx: Context, next: Function) => {
            throw new BusinessError(ErrorCode.UnAuthorized, "未授权");
        });
};
