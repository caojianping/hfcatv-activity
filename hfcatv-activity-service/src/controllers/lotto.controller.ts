import {BaseContext} from 'koa';

export default class UserController {
    async getLottos(ctx: BaseContext, next: any) {
        await next();
    }

    async getPageLottos(ctx: BaseContext, next: any) {
        await next();
    }

    async receiveLotto(ctx: BaseContext, next: any) {
        await next();
    }

    async excuteLotto(ctx: BaseContext, next: any){
        await next();
    }
};
