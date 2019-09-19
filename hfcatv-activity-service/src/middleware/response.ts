import {Context} from "koa";
import {JsonResult} from "../common/json-result";

export default () => async (ctx: Context, next: Function) => {
    ctx.success = function success<T>(data: T) {
        ctx.body = JsonResult.success<T>(data);
    };

    ctx.failure = function failure<T>(code?: number, message?: string) {
        ctx.failure = JsonResult.failure<T>(code, message);
    };

    await next();
};
