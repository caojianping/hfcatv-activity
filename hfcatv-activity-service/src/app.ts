import Koa from "koa";
import {Console} from "./common/logger";
import middleware from "./middleware";
import routes from "./routes";

import Database from "./db";

Database.connect();

const app = new Koa();
app.use(middleware());
app.use(routes());

const port = process.env.PORT || 9000;
app.listen(port, () => {
	Console.info(`Koa server listen on port ${port}.`);
});