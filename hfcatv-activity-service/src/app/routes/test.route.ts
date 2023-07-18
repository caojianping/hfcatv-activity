/***
 * @file:
 * @author: caojianping
 * @Date: 2021-03-19 14:58:36
 */
import { Context } from "koa";
import Router from "koa-router";
import { BusinessError, ErrorType } from "../../error";
import { ManagerService } from "../services";

export default (router: Router) => {
  return router
    .get("/action01", async (ctx: Context, next: Function) => {
      ctx.success({ id: 1, name: "cjp" });
    })
    .get("/action02", async (ctx: Context, next: Function) => {
      ctx.failure(300, "操作失误");
    })
    .get("/action03", async (ctx: Context, next: Function) => {
      throw new Error("这是一个系统异常");
    })
    .get("/action04", async (ctx: Context, next: Function) => {
      throw new BusinessError(ErrorType.Others.code, ErrorType.Others.message);
    })
    .post("/action05", async (ctx: Context, next: Function) => {
      let manager = await new ManagerService().addManager(ctx.request.body || {});
      ctx.success(manager);
    });
};
