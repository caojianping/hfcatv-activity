import {Context} from "koa";
import {ErrorType} from "../error";
import {ManagerDocument} from "../interfaces";
import {TokenHelper, ManagerToken} from "../helpers";
import {ManagerService} from "../services";

const managerService = new ManagerService();

export default class ManagerController {
    async login(ctx: Context, next: Function) {
        let {username, password} = ctx.request.body,
            result = await managerService.isExist({username: username});
        if (!result.status) ctx.failure(ErrorType.UsernameOrPasswordWrong);
        else {
            let manager: ManagerDocument = <ManagerDocument>result.data,
                isEqual = manager.validatePassword(password);
            if (!isEqual) ctx.failure(ErrorType.UsernameOrPasswordWrong);
            else ctx.success(TokenHelper.createToken(new ManagerToken(manager._id, manager.username)));
        }
    }

    async logout(ctx: Context, next: Function) {
        console.log("logout:", ctx.state);
        delete ctx.state.managerId;
        delete ctx.state.user;
        ctx.success(true);
    }

    async setPassword(ctx: Context, next: Function) {
        let managerId = ctx.state.managerId,
            password = ctx.request.body.password,
            result = await managerService.setPassword({_id: managerId}, password);
        ctx.success(!!result);
    }

    async getTokenStatus(ctx: Context, next: Function) {
        ctx.success(!!ctx.state.managerId);
    }

    async refreshTokenStatus(ctx: Context, next: Function) {
        let managerId = ctx.state.managerId,
            manager = await managerService.getManager(managerId);
        if (!managerId) ctx.failure(
            ErrorType.DataInexistence.code,
            `${ErrorType.DataInexistence.message}:[管理员]`
        );
        else ctx.success(TokenHelper.createToken(new ManagerToken(manager._id, manager.username)));
    }
};
