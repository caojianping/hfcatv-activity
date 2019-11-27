import Router from "koa-router";
import compose from "koa-compose";
import {Constants} from "../../common/constants";
import apiRoute from "./api.route";
import adminRoute from "./admin.route";
import testRoute from "./test.route";

const childrens: Array<any> = [
	{prefix: `${Constants.VIRTUAL_PATH}/api`, routes: apiRoute},
	{prefix: `${Constants.VIRTUAL_PATH}/admin`, routes: adminRoute},
	{prefix: `${Constants.VIRTUAL_PATH}/test`, routes: testRoute}
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
