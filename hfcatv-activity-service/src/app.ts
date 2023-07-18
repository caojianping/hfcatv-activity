/***
 * @file: 
 * @author: caojianping
 * @Date: 2021-03-19 14:58:36
 */
import Koa from "koa";
import config from "config";
import { Console } from "./common/logger";
import middleware from "./middleware";
import routes from "./app/routes";

import Database from "./db";

Database.connect();

const app = new Koa();
app.use(middleware());
app.use(routes());

let port = config.get<number>("services.port");
app.listen(port, () => {
  Console.info(`Koa server listen on port ${port}.`);
});
