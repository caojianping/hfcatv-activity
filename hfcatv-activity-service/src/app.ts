import Koa from "koa";
import config from "config";
import middlewares from "./middlewares";
import routes from "./routes";
import Database from "./db";

Database.connect();

const app = new Koa();
app.use(middlewares());
app.use(routes());

app.listen(config.get<number>("port"));
