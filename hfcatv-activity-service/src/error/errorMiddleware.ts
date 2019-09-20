import {Context} from "koa";
import BusinessError from "./businessError";

export default () => async (ctx: Context, next: Function) => {
    try {
        await next();
    } catch (err) {
        if (err instanceof BusinessError) {
            ctx.status = 200;
            ctx.failure(err.code, err.message);
        } else {
            let status = typeof err.status === "number" ? err.status : 500;
            ctx.status = status;
            ctx.failure(status, err.message);
        }
    }
};
