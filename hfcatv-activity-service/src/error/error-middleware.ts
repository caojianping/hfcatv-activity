import {Context} from "koa";
import BusinessError from "./business-error";

export default () => async (ctx: Context, next: Function) => {
    try {
        await next();
    } catch (err) {
        if (err instanceof BusinessError) {
            console.log("BusinessError:", err);
            ctx.status = 200;
            ctx.failure(err.code, err.message);
        } else {
            console.log("Not BusinessError:", err.status, err.message, err);
            let status = err.status || 500;
            ctx.status = status;
            ctx.failure(status, err.message || err);
        }
    }
};
