import Router from "koa-router";
import {UserController, ActivityController, LottoController} from "../controllers";

const userController = new UserController();
const activityController = new ActivityController();
const lottoController = new LottoController();

export default (router: Router) => {
    return router
        .get("/activity/lastest", activityController.getActivity)
        .post("/user/add", userController.addUser)
        .post("/lotto/exec", lottoController.addLotto)
        .post("/lotto/list/:page/:limit", lottoController.getLottos);
};