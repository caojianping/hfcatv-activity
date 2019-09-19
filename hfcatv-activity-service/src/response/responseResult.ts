import uuidv1 from "uuid/v1";
import ResponseCode from "./responseCode";

export default class ResponseResult<T> {
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

    public static success<T>(data: T): ResponseResult<T> {
        return new ResponseResult<T>(ResponseCode.Success, data, "操作成功");
    }

    public static failure<T>(code: number = ResponseCode.Unknown, message: string = "操作失败"): ResponseResult<T> {
        return new ResponseResult<T>(code, null, message);
    }
};
