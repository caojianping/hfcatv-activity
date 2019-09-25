import {PaginateModel, PaginateResult} from "mongoose";
import {BusinessError, ErrorType} from "../error";

export default class BaseService {
	model: PaginateModel<any>;

	constructor(model: PaginateModel<any>) {
		this.model = model;
	}

	async getPage<T>(conditions: any, options: any): Promise<PaginateResult<T>> {
		if (!conditions) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[查询条件]`));
		conditions["isDelete"] = false;
		return await this.model.paginate(conditions, options);
	}

	async softDelete(id: string): Promise<boolean> {
		if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[文档编号]`));
		return await this.model.findByIdAndUpdate(id, {isDelete: true}, {new: true});
	}

	async isExist(conditions: any): Promise<any> {
		if (!conditions) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[查询条件]`));
		conditions["isDelete"] = false;
		let doc = await this.model.findOne(conditions);
		return doc ? {status: true, data: doc} : {status: false, data: null};
	}
};
