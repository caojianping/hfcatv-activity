import {BaseContext} from 'koa';

export default class UserController {
    async test(ctx: BaseContext, next: any) {
        await next();
    }
};
