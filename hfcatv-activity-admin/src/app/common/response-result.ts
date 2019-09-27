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
};
