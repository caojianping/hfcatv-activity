import Router from 'koa-router';
import {ManagerController, AwardController, ActivityController, LottoController} from "../controllers";
import {Context} from "koa";

const managerController = new ManagerController();
const awardController = new AwardController();
const activityController = new ActivityController();
const lottoController = new LottoController();

export default (router: Router) => {
	return router
		.post("/account/login", managerController.login)
		.post("/account/setPassword", managerController.setPassword)

		.get("/token/status", managerController.getTokenStatus)
		.get("/token/refresh", managerController.refreshTokenStatus)

		.get("/award/list/:page/:limit", awardController.getPageAwards)
		.post("/award/add", awardController.addAward)
		.post("/award/update", awardController.updateAward)
		.post("/award/remove", awardController.removeAward)

		.get("/activity/list/:page/:limit", activityController.getPageActivities)
		.post("/activity/add", activityController.addActivity)
		.post("/activity/update", activityController.updateActivity)
		.post("/activity/remove", activityController.removeActivity)

		.get("/lotto/list/:page/:limit", lottoController.getPageLottos)
		.post("/lotto/setStatus", lottoController.setStatus)

		.get("/test", async (ctx: Context, next: Function) => {
			console.log("/admin/test state:", ctx.state);
			ctx.success(ctx.state);
		});
};
