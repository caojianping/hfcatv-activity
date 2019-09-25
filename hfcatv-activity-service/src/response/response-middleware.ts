import {Context} from "koa";
import ResponseResult from "./response-result";
import ResponseOptions from "./response-options";

export default () => async (ctx: Context, next: Function) => {
	ctx.success = function success<T>(data: T) {
		ctx.body = ResponseResult.success<T>(data);
	};

	ctx.failure = function failure<T>(options?: number | ResponseOptions, message?: string) {
		ctx.body = ResponseResult.failure<T>(options, message);
	};

	await next();
};
