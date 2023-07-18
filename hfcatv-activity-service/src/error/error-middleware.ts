/***
 * @file: 
 * @author: caojianping
 * @Date: 2021-03-19 14:58:36
 */
import { Context } from "koa";
import { Console, Logger } from "../common/logger";
import BusinessError from "./business-error";

export default () => async (ctx: Context, next: Function) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof BusinessError) {
      Console.info("/BusinessError err:", err);
      Logger.info("/BusinessError err:", err);
      ctx.status = 200;
      ctx.failure(err.code, err.message);
    } else {
      Console.info("/NonBusinessError status,message,err:", err.status, err.message, err);
      Logger.info("/NonBusinessError status,message,err:", err.status, err.message, err);
      let status = err.status || 500;
      ctx.status = status;
      ctx.failure(status, err.message || err);
    }
  }
};
