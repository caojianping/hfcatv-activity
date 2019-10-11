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
		return await this.model.find({isDelete: false});
	}

	async getAwardIdsByType(type: number): Promise<Array<string>> {
		let awards = await this.model.find({type: type, isDelete: false});
		return awards.map((award: AwardDocument) => award._id);
	}

	async addAward(name: string, type: AwardType, minimum?: number, maximum?: number): Promise<AwardDocument | null> {
		if (!name) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[奖品名称]`));
		if ([0, 1, 2, 3].indexOf(type) < 0) return Promise.reject(new BusinessError(ErrorType.InvalidType.code, `${ErrorType.InvalidType.message}:[奖品类型]`));

		if (
			type === AwardType.RedPacket &&
			(minimum === undefined || maximum === undefined)
		) {
			return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[红包额度范围]`));
		}

		let result = await this.isExist({name: name, type: type, isDelete: false});
		if (result.status) return Promise.reject(new BusinessError(ErrorType.DataExist.code, `${ErrorType.DataExist.message}:[奖品]`));
		return await this.model.create({
			name: name,
			type: type,
			minimum: minimum,
			maximum: maximum,
			createTime: new Date()
		});
	}

	async updateAward(id: string, update: any): Promise<AwardDocument | null> {
		if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[奖品编号]`));
		if (!update) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[奖品更新数据]`));

		update["updateTime"] = new Date();
		return await this.model.findByIdAndUpdate(id, {$set: update}, {new: true});
	}
};
