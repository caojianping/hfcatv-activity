import Router from "koa-router";
import LottoController from "../controllers/lotto.controller";
import {Context} from "koa";

const lottoController = new LottoController();

export default (router: Router) => {
    router
        .get("/test", async (ctx: Context, next: Function) => {
            ctx.success({id: 1, name: "cjp"});
            next();
        })
        .get("/lotto/list", lottoController.getLottos)
        .get("/lotto/page", lottoController.getPageLottos)
        .post("/lotto/receive/:id", lottoController.receiveLotto)
        .post("/lotto/excute", lottoController.excuteLotto);
}