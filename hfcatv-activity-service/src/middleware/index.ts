import compose from "koa-compose";
import koaStatic from "koa-static";
import convert from "koa-convert";
import cors from "koa-cors";
import helmet from "koa-helmet";
import bodyParser from "koa-bodyparser";
import json from "koa-json";
import logger from "koa-logger";
import jwt from "koa-jwt";
import config from "config";

import {error} from "../error";
import {response} from "../response";

const secret = config.get<string>("jwt.secret");

export default function middlewares() {
    return compose([
        error(),

        koaStatic(__dirname + "./static"),
        convert(cors()),
        logger(),
        bodyParser(),
        json(),
        helmet(),

        response(),
        // auth(),
        jwt({secret: secret})
            .unless({
                path: [
                    /^\/api/,
                    /^\/admin\/account\/login/,
                    /^\/admin\/account\/logout/,
                    /^\/admin\/token\/status/
                ]
            }),
    ]);
};
