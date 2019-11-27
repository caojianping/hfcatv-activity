import {Context} from "koa";
import Router from 'koa-router';
import koaJwt from "koa-jwt";
import config from "config";
import {Constants} from "../../common/constants";
import {ManagerController, AwardController, ActivityController, LottoController} from "../controllers";

const managerController = new ManagerController();
const awardController = new AwardController();
const activityController = new ActivityController();
const lottoController = new LottoController();

const secret = config.get<string>("jwt.secret");
const jwt = koaJwt({secret: secret})
	.unless({
		path: [
			new RegExp(`${Constants.VIRTUAL_PATH}/admin/account/login`),
			new RegExp(`${Constants.VIRTUAL_PATH}/admin/account/logout`),
			new RegExp(`${Constants.VIRTUAL_PATH}/admin/token/status`),
			new RegExp(`${Constants.VIRTUAL_PATH}/admin/test`)
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

		.get("/test", async (ctx: Context, next: Function) => {
			ctx.success(ctx.state);
		});
};
