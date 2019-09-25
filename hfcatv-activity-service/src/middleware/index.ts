import compose from "koa-compose";
import convert from "koa-convert";
import cors from "koa-cors";
import helmet from "koa-helmet";
import bodyParser from "koa-bodyparser";
import json from "koa-json";
import logger from "koa-logger";
import jwt from "koa-jwt";
import config from "config";

import {ErrorMiddleware} from "../error";
import {ResponseMiddleware} from "../response";
import AuthMiddleware from "./auth.middleware";

const secret = config.get<string>("jwt.secret");

export default function middlewares() {
	return compose([
		ErrorMiddleware(),
		ResponseMiddleware(),
		AuthMiddleware(),
		jwt({secret: secret})
			.unless({path: [/^\/admin\/account\/login/, /^\/api/]}),
		logger(),
		json(),
		bodyParser(),
		helmet(),
		convert(cors())
	]);
};
