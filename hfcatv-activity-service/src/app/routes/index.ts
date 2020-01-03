import Router from "koa-router";
import compose from "koa-compose";
import config from "config";
import apiRoute from "./api.route";
import adminRoute from "./admin.route";
import testRoute from "./test.route";

let env = process.env.NODE_ENV || "development",
    virtual = config.get<string>(`services.${env}.virtual`),
    childrens: Array<any> = [
        {prefix: `${virtual}/api`, routes: apiRoute},
        {prefix: `${virtual}/admin`, routes: adminRoute},
        {prefix: `${virtual}/test`, routes: testRoute}
    ];

export default function routes() {
    const router = new Router();
    childrens.forEach((children: any) => {
        const nestedRouter = new Router();
        children.routes(nestedRouter);
        router.use(children.prefix, nestedRouter.routes(), nestedRouter.allowedMethods());
    });
    return compose([router.routes(), router.allowedMethods()]);
};
