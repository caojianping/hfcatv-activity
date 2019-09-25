import {Context} from "koa";
import {ErrorType} from "../error";
import {ManagerDocument} from "../models";
import {TokenHelper, ManagerToken} from "../helpers";
import {ManagerService} from "../services";

const managerService = new ManagerService();

export default class ManagerController {
    async login(ctx: Context, next: Function) {
        let {username, password} = ctx.request.body,
            result = await managerService.isExist({username: username});
        if (!result.status) ctx.failure(ErrorType.UsernameOrPasswordWrong.code, ErrorType.UsernameOrPasswordWrong.message);
        else {
            let manager: ManagerDocument = <ManagerDocument>result.data,
                isEqual = manager.validatePassword(password);
            console.log("isEqual:", isEqual);
            if (!isEqual) ctx.failure(ErrorType.UsernameOrPasswordWrong.code, ErrorType.UsernameOrPasswordWrong.message);
            else ctx.success({
                username: manager.username,
                token: TokenHelper.createToken(new ManagerToken(manager._id, manager.username))
            });
        }
    }

    async setPassword(ctx: Context, next: Function) {
        let managerId = ctx.state.managerId,
            password = ctx.request.body.password,
            result = await managerService.setPassword({_id: managerId}, password);
        result ? ctx.success(true) : ctx.failure(false);
    }

    async getTokenStatus(ctx: Context, next: Function) {
        ctx.success(!!ctx.state.managerId);
    }

    async refreshTokenStatus(ctx: Context, next: Function) {
        let managerId = ctx.state.managerId,
            manager = await managerService.getManager(managerId);
        if (!managerId) ctx.failure(ErrorType.DataInexistence.code, ErrorType.DataInexistence.message);
        else ctx.success({
            username: manager.username,
            token: TokenHelper.createToken(new ManagerToken(manager._id, manager.username))
        });
    }
};
