import compose from "koa-compose";
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
import auth from "./auth.middleware";

const secret = config.get<string>("jwt.secret");

export default function middlewares() {
	return compose([
		error(),
		response(),
		auth(),
		jwt({secret: secret})
			.unless({path: [/^\/admin\/account\/login/, /^\/admin\/token\/status/, /^\/api/]}),
		logger(),
		json(),
		bodyParser(),
		helmet(),
		convert(cors())
	]);
};
