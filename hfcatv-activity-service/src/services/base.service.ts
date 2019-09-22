import {PaginateModel, PaginateResult} from "mongoose";

export default class BaseService {
    model: PaginateModel<any>;

    constructor(model: PaginateModel<any>) {
        this.model = model;
    }

    async getPage<T>(conditions: any, options: any): Promise<PaginateResult<T>> {
        if (!conditions) return Promise.reject("查询条件不可以为空");

        let result = await this.model.paginate(conditions, options);
        console.log("BaseService.getPage result:", result);
        return result;
    }

    async softDelete(id: string): Promise<boolean> {
        if (!id) return Promise.reject("文档编号不可以为空");

        let doc = await this.model.findByIdAndUpdate(id, {isDelete: true}, {new: true});
        console.log("BaseService.remove softDelete:", doc);
        return doc.isDelete;
    }

    async isExist(conditions: any): Promise<any> {
        if (!conditions) return Promise.reject("查询条件不可以为空");

        let doc = await this.model.findOne(conditions);
        console.log("BaseService.isExist doc:", doc);
        return doc ? {status: true, data: doc} : {status: false, data: null};
    }
};
