import compose from "koa-compose";
import bodyParser from "koa-bodyparser";
import json from "koa-json";
import cors from "koa-cors";
import logger from "koa-logger";
import exceptionMiddleware from "./exception.middleware";

export default function middlewares() {
    return compose([
        bodyParser(),
        json(),
        cors(),
        logger(),
        exceptionMiddleware()
    ]);
};
