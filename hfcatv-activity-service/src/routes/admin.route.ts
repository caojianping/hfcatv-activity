import {Context} from "koa";
import Router from 'koa-router';
import {ManagerController, AwardController, ActivityController, LottoController} from "../controllers";

const managerController = new ManagerController();
const awardController = new AwardController();
const activityController = new ActivityController();
const lottoController = new LottoController();


import koaJwt from "koa-jwt";
import config from "config";

const secret = config.get<string>("jwt.secret");
const jwt = koaJwt({secret: secret})
    .unless({
        path: [
            /^\/admin\/account\/login/,
            /^\/admin\/account\/logout/,
            /^\/admin\/token\/status/,
            /^\/admin\/test/
        ]
    });

export default (router: Router) => {
    return router
        .use(jwt)
        .post("/account/login", managerController.login)
        .get("/account/logout", managerController.logout)
        .post("/account/setPassword", managerController.setPassword)

        .get("/token/status", managerController.getTokenStatus)
        .get("/token/refresh", managerController.refreshTokenStatus)

        .get("/award/list", awardController.getAwards)
        .post("/award/list/:page/:limit", awardController.getPageAwardsByConditions)
        .post("/award/add", awardController.addAward)
        .post("/award/update", awardController.updateAward)
        .post("/award/remove", awardController.removeAward)

        .post("/activity/list/:page/:limit", activityController.getPageActivitiesByConditions)
        .post("/activity/add", activityController.addActivity)
        .post("/activity/update", activityController.updateActivity)
        .post("/activity/remove", activityController.removeActivity)

        .post("/lotto/list/:page/:limit", lottoController.getPageLottosByConditions)
        .post("/lotto/setStatus", lottoController.setStatus)

        .get("/test", async (ctx: Context, next: Function) => {
            ctx.success(ctx.state);
        });
};
