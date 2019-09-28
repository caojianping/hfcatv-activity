import {BusinessError, ErrorType} from "../error";
import {AwardType} from "../common/enums";
import {AwardDocument} from "../interfaces";
import {AwardModel} from "../models";
import BaseService from "./base.service";

export default class AwardService extends BaseService {
	constructor() {
		super(AwardModel);
	}

	async getAwards(): Promise<Array<AwardDocument>> {
		return await this.model.find();
	}

	async addAward(name: string, type: AwardType): Promise<AwardDocument | null> {
		if (!name) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[奖品名称]`));
		if (type < 0) return Promise.reject(new BusinessError(ErrorType.InvalidType.code, `${ErrorType.InvalidType.message}:[奖品类型]`));

		let result = await this.isExist({name: name, isDelete: false});
		if (result.status) return Promise.reject(new BusinessError(ErrorType.DataExist.code, `${ErrorType.DataExist.message}:[奖品]`));
		return await this.model.create({name: name, type: type});
	}

	async addAwards(awards: Array<any>): Promise<Array<AwardDocument>> {
		if (awards.length <= 0) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[奖品列表]`));
		return await this.model.create(awards);
	}

	async updateAward(id: string, update: any): Promise<AwardDocument> {
		if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[奖品编号]`));
		if (!update) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[更新数据]`));

		update["updateTime"] = new Date();
		return await this.model.findByIdAndUpdate(id, {$set: update}, {new: true});
	}
};
