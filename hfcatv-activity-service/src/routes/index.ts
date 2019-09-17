import Router from 'koa-router';
import compose from 'koa-compose';
import apiRoute from './api.route';
import adminRoute from './admin.route';

const childrens: Array<any> = [
    {routes: apiRoute, prefix: '/api'},
    {routes: adminRoute, prefix: '/admin'}
];

export default function routes () {
    const router = new Router();
    childrens.forEach((children: any) => {
        const nestedRouter = new Router();
        children.routes(nestedRouter);
        router.use(children.prefix, nestedRouter.routes(), nestedRouter.allowedMethods());
    });
    return compose([router.routes(), router.allowedMethods()]);
}
