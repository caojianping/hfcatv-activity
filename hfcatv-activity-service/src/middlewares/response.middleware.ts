export default async (ctx: any, next: any) => {
    ctx.success = (data: any, msg: string) => {
        ctx.body = {
            code: 200,
            data,
            msg,
            success: true,
        };
    };

    await next();
};
