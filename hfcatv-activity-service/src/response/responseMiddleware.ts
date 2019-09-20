import {Context} from "koa";
import ResponseResult from "./responseResult";

export default () => async (ctx: Context, next: Function) => {
    ctx.success = function success<T>(data: T) {
        ctx.body = ResponseResult.success<T>(data);
    };

    ctx.failure = function failure<T>(code?: number, message?: string) {
        ctx.body = ResponseResult.failure<T>(code, message);
    };

    await next();
};
