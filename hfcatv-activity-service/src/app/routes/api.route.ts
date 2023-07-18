/***
 * @file: 
 * @author: caojianping
 * @Date: 2021-03-19 14:58:36
 */
import Router from "koa-router";
import { UserController, ActivityController, LottoController, AwardController } from "../controllers";

const userController = new UserController();
const activityController = new ActivityController();
const lottoController = new LottoController();
const awardController = new AwardController();

export default (router: Router) => {
  return router
    .post("/user/detail", userController.getUser)
    .get("/activity/detail", activityController.getActivity)
    .get("/lotto/lastest", lottoController.getLastestLottos)
    .post("/lotto/exec", lottoController.execLotto)

    .get("/award/types", awardController.getAwardTypes)
    .post("/lotto/list/:page/:limit", lottoController.getPageLottosByWechat)
    .post("/lotto/receive", lottoController.receiveLotto);
};
