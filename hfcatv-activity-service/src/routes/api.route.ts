import Router from 'koa-router';
import LottoController from '../controllers/lotto.controller';

const lottoController = new LottoController();

export default (router: Router) => {
    router
        .get("/lotto/list", lottoController.getLottos)
        .get("/lotto/page", lottoController.getPageLottos)
        .post("/lotto/receive/:id", lottoController.receiveLotto)
        .post("/lotto/excute", lottoController.excuteLotto);
}
