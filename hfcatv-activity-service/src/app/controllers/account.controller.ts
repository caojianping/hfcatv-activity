import { Context } from "koa";
import { ErrorType } from "../../error";
import { TokenHelper, ManagerToken } from "../../helpers";
import { ManagerDocument } from "../interfaces";
import { ManagerService } from "../services";
import { Console, Logger } from "../../common/logger";

const managerService = new ManagerService();

export default class AccountController {
  // for admin
  async login(ctx: Context, next: Function) {
    let { username, password } = ctx.request.body || {},
      result = await managerService.isExist({ username: username });
    if (!result.status) ctx.failure(ErrorType.UsernameOrPasswordWrong);
    else {
      let manager: ManagerDocument = <ManagerDocument>result.data,
        isEqual = manager.validatePassword(password);
      if (!isEqual) ctx.failure(ErrorType.UsernameOrPasswordWrong);
      else ctx.success(TokenHelper.createToken(new ManagerToken(manager._id, manager.username, manager.role)));
    }
  }

  // for admin
  async logout(ctx: Context, next: Function) {
    delete ctx.state.user;
    ctx.success(true);
  }

  // for admin
  async setPassword(ctx: Context, next: Function) {
    let managerId = TokenHelper.getManagerId(ctx.state.user),
      { password } = ctx.request.body || {};
    Console.info("/api/account/setPassword managerId, password:", managerId, password);
    Logger.info("/api/account/setPassword managerId, password:", managerId, password);

    let result = await managerService.setPassword({ _id: managerId }, password);
    ctx.success(!!result);
  }

  // for admin
  async getTokenStatus(ctx: Context, next: Function) {
    ctx.success(!!TokenHelper.getManagerId(ctx.state.user));
  }

  // for admin
  async refreshTokenStatus(ctx: Context, next: Function) {
    let managerId = TokenHelper.getManagerId(ctx.state.user),
      manager = await managerService.getManager(managerId);
    if (!manager) ctx.failure(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[管理员]`);
    else ctx.success(TokenHelper.createToken(new ManagerToken(manager._id, manager.username, manager.role)));
  }
}
