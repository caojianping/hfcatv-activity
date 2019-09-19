import {Context} from "koa";

export default class LottoController {
    async getLottos(ctx: Context, next: Function) {
        await next();
    }

    async getPageLottos(ctx: Context, next: Function) {
        await next();
    }

    async receiveLotto(ctx: Context, next: Function) {
        await next();
    }

    async excuteLotto(ctx: Context, next: Function){
        await next();
    }
};
