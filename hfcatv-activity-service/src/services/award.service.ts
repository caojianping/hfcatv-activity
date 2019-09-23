import {BusinessError, ErrorType} from "../error";
import {AwardType} from "../common/enums";
import {AwardDocument, AwardModel} from "../models";
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
        return await this.model.create({name: name, type: type});
    }

    async addAwards(awards: Array<any>): Promise<Array<AwardDocument>> {
        if (awards.length <= 0) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[奖品列表]`));
        return await this.model.create(awards);
    }

    async updateAward(conditions: any, update: any): Promise<AwardDocument> {
        if (!conditions) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[查询条件]`));
        if (!update) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[更新数据]`));

        conditions["isDelete"] = false;
        update["updateTime"] = new Date();
        return await this.model.findOneAndUpdate(conditions, {$set: update}, {new: true});
    }
};
