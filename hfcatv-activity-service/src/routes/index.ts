import Router from "koa-router";
import compose from "koa-compose";
import apiRoute from "./api.route";
import adminRoute from "./admin.route";
import testRoute from "./test.route";

const childrens: Array<any> = [
	{prefix: "/api", routes: apiRoute},
	{prefix: "/admin", routes: adminRoute},
	{prefix: "/test", routes: testRoute}
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
