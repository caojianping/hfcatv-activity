import compose from "koa-compose";
import bodyParser from "koa-bodyparser";
import json from "koa-json";
import cors from "koa-cors";
import helmet from "koa-helmet";
import logger from "koa-logger";

import exception from "./exception";
import response from "./response";

export default function middlewares() {
    return compose([
        exception(),
        response(),
        logger(),
        json(),
        bodyParser(),
        helmet(),
        cors()
    ]);
};
