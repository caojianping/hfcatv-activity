export default class BusinessError implements Error {
    code: number;
    message: string;
    name: string;
    stack: string;

    constructor(code: number, message: string) {
        this.code = code;
        this.message = message;
    }
}
