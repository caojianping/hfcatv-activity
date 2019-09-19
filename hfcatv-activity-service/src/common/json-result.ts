import uuidv1 from "uuid/v1";
import {ResponseCode} from "./enums";

export class JsonResult<T> {
    code: number;
    data: T;
    message: string;
    trace: string;

    constructor(code: number, data: T, message: string) {
        this.code = code;
        this.data = data;
        this.message = message;
        this.trace = uuidv1();
    }

    public static success<T>(data: T): JsonResult<T> {
        return new JsonResult<T>(ResponseCode.Success, data, "操作成功");
    }

    public static failure<T>(code: number = ResponseCode.Unknown, message: string = "操作失败"): JsonResult<T> {
        return new JsonResult<T>(code, null, message);
    }
}