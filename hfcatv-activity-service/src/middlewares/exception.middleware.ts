import {Context} from "koa";

export default () => async (ctx: Context, next: Function) => {
    try {
        await next();
    } catch (err) {
        ctx.status = typeof err.status === 'number' ? err.status : 500;
        ctx.body = {
            success: false,
            message: err.message,
        };
    }
};
