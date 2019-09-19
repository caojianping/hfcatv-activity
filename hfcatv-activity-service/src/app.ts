import Koa from "koa";
import config from "config";
import middleware from "./middleware";
import routes from "./routes";
import Database from "./db";

Database.connect();

const app = new Koa();
app.use(middleware());
app.use(routes());

const port = config.get<number>("port");
app.listen(port, ()=>{
    console.log(`Koa server listen on port ${port}.`);
});
