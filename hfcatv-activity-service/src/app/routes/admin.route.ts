/***
 * @file:
 * @author: caojianping
 * @Date: 2021-03-19 14:58:36
 */
import { Context } from "koa";
import Router from "koa-router";
import koaJwt from "koa-jwt";
import config from "config";
import {
  AccountController,
  ManagerController,
  AwardController,
  ActivityController,
  LottoController,
  UserController,
} from "../controllers";

const accountController = new AccountController();
const managerController = new ManagerController();
const awardController = new AwardController();
const activityController = new ActivityController();
const lottoController = new LottoController();
const userController = new UserController();

let virtual = config.get<string>("services.virtual"),
  secret = config.get<string>("jwt.secret"),
  jwt = koaJwt({ secret: secret }).unless({
    path: [
      new RegExp(`${virtual}/admin/account/login`),
      new RegExp(`${virtual}/admin/account/logout`),
      new RegExp(`${virtual}/admin/token/status`),
      new RegExp(`${virtual}/admin/test`),
    ],
  });

export default (router: Router) => {
  return router
    .use(jwt)
    .post("/account/login", accountController.login)
    .get("/account/logout", accountController.logout)
    .post("/account/setPassword", accountController.setPassword)

    .get("/token/status", accountController.getTokenStatus)
    .get("/token/refresh", accountController.refreshTokenStatus)

    .get("/award/list", awardController.getAwards)
    .post("/award/list/:page/:limit", awardController.getPageAwards)
    .post("/award/add", awardController.addAward)
    .post("/award/update", awardController.updateAward)
    .post("/award/remove", awardController.removeAward)

    .post("/activity/list/:page/:limit", activityController.getPageActivities)
    .post("/activity/add", activityController.addActivity)
    .post("/activity/update", activityController.updateActivity)
    .post("/activity/remove", activityController.removeActivity)
    .post("/activity/setSwitch", activityController.setSwitch)
    .post("/activity/setAward", activityController.setAward)
    .post("/activity/removeAward", activityController.removeAward)

    .post("/lotto/list/:page/:limit", lottoController.getPageLottos)
    .post("/lotto/setStatus", lottoController.setStatus)
    .post("/lotto/sendRedPacket", lottoController.sendRedPacket)

    .post("/manager/list/:page/:limit", managerController.getPageManagers)
    .post("/manager/add", managerController.addManager)
    .post("/manager/update", managerController.updateManager)
    .post("/manager/remove", managerController.removeManager)
    .post("/manager/resetPassword", managerController.resetPassword)

    .post("/user/list/:page/:limit", userController.getPageUsers)
    .post("/user/setLottoCount", userController.setLottoCount)

    .get("/test", async (ctx: Context, next: Function) => {
      ctx.success(ctx.state);
    });
};
