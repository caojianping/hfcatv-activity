export default class BusinessError extends Error {
    errCode: number;
    errMsg?: string;

    constructor(errCode: number, errMsg?: string) {
        super(errMsg);
        this.errCode = errCode;
        this.errMsg = errMsg;
    }
}
