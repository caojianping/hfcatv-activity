import {BaseContext} from 'koa';

export default class AwardController {
    async test(ctx: BaseContext, next: any) {
        await next();
    }
};
