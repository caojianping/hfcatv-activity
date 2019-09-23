import {Context} from "koa";
import Router from 'koa-router';
import {ManagerController, AwardController, ActivityController, LottoController} from "../controllers";

const managerController = new ManagerController();
const awardController = new AwardController();
const activityController = new ActivityController();
const lottoController = new LottoController();

export default (router: Router) => {
    return router
        .post("/account/login", managerController.login)
        .post("/account/setPassword", managerController.setPassword)

        .post("/award/add",awardController.addAward)
        .post("/award/update", awardController.updateAward)
        .post("/award/remove",awardController.removeAward)

        .post("/activity/add",activityController.addActivity)
        .post("/activity/update",activityController.updateActivity)
        .post("/activity/remove",activityController.removeActivity)

        .post("/lotto/list/:page/:limit",async (ctx: Context, next: Function) => await next())
        .post("/lotto/setStatus", async (ctx: Context, next: Function) => await next());
};
