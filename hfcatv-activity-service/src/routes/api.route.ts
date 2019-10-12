import Router from "koa-router";
import {UserController, ActivityController, LottoController, AwardController} from "../controllers";

const userController = new UserController();
const activityController = new ActivityController();
const lottoController = new LottoController();
const awardController = new AwardController();

export default (router: Router) => {
	return router
		.get("/activity/detail", activityController.getActivity)
		.post("/user/detail", userController.getUser)
		.post("/lotto/exec", lottoController.execLotto)
		.get("/lotto/lastest", lottoController.getLastestLottos)
		.post("/lotto/list/:page/:limit", lottoController.getPageLottosByOpenId)
		.post("/lotto/receive", lottoController.receiveLotto)
		.get("/award/types", awardController.getAwardTypes);
};
