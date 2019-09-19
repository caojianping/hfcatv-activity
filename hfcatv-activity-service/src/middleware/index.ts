import compose from "koa-compose";
import convert from "koa-convert";
import bodyParser from "koa-bodyparser";
import json from "koa-json";
import cors from "koa-cors";
import helmet from "koa-helmet";
import logger from "koa-logger";

import {ErrorMiddleware} from "../error";
import {ResponseMiddleware} from "../response";

export default function middlewares() {
    return compose([
        ErrorMiddleware(),
        ResponseMiddleware(),
        logger(),
        json(),
        bodyParser(),
        helmet(),
        convert(cors())
    ]);
};
