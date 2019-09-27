import {Context} from "koa";
import {ErrorType, BusinessError} from "../error";
import {TokenHelper, ManagerToken} from "../helpers";

export default () => async (ctx: Context, next: Function) => {
    let path = ctx.path;
    console.log("AuthMiddleware path:", path);
    if (
        path.indexOf("/api") === 0 ||
        path.indexOf("/admin/account/login") === 0 ||
        path.indexOf("/admin/account/logout") === 0 ||
        path.indexOf("/admin/token/status") === 0
    ) {
        await next();
    } else {
        let method = ctx.method;
        console.log("AuthMiddleware method:", method);
        if (method === "OPTIONS") await next();
        else {
            let token = ctx.header.authorization,
                data: ManagerToken | boolean = await TokenHelper.checkToken(token);
            console.log("AuthMiddleware authorization:", token);
            console.log("AuthMiddleware data:", data);
            if (!data) throw new BusinessError(ErrorType.AuthorizationFailed.code, ErrorType.AuthorizationFailed.message);
            ctx.state.managerId = (<ManagerToken>data).managerId;
            await next();
        }
    }
}
