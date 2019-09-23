import Router from "koa-router";
import {UserController, ActivityController, LottoController} from "../controllers";

const userController = new UserController();
const activityController = new ActivityController();
const lottoController = new LottoController();

export default (router: Router) => {
    return router
        .get("/activity/detail", activityController.getActivity)
        .post("/user/detail", userController.getUser)
        .post("/lotto/exec", lottoController.execLotto)
        .post("/lotto/list/:page/:limit", lottoController.getLottos)
        .post("/lotto/receive", lottoController.receiveLotto);
};
