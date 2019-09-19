import {Context} from "koa";
import BusinessError from "./businessError";

export default () => async (ctx: Context, next: Function) => {
    try {
        await next();
    } catch (err) {
        console.log("errorMiddleware err:", err);
        if (err instanceof BusinessError) {
            console.log("errorMiddleware is BusinessError");
            ctx.status = 200;
            ctx.failure(err.errCode, err.errMsg);
        } else {
            console.log("errorMiddleware isn't BusinessError!");
            let status = typeof err.status === "number" ? err.status : 500;
            ctx.status = status;
            ctx.failure(status, err.message);
        }
    }
};
