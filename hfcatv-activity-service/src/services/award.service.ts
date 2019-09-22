import {AwardDocument, AwardModel} from "../models";
import BaseService from "./base.service";
import {AwardType} from "../common/enums";

export default class AwardService extends BaseService {
    constructor() {
        super(AwardModel);
    }

    async getAwards(): Promise<Array<AwardDocument>> {
        let awards = await this.model.find();
        console.log("AwardService.getAwards awards:", awards);
        return awards;
    }

    async addAward(name: string, type: AwardType): Promise<AwardDocument> {
        if (!name) return Promise.reject("奖品名称不可以为空");
        if (type <= 0) return Promise.reject("无效的奖品类型");

        let award = await this.model.create({name: name, type: type});
        console.log("AwardService.addAward award:", award);
        return award;
    }

    async addAwards(awards: Array<any>): Promise<Array<AwardDocument>> {
        if (awards.length <= 0) return Promise.reject("奖品列表不可以为空");

        let docs = await this.model.create(awards);
        console.log("AwardService.addAwards docs:", docs);
        return docs;
    }

    async updateAward(conditions: any, update: any): Promise<AwardDocument> {
        if (!conditions) return Promise.reject("查询条件不可以为空");
        if (!update) return Promise.reject("更新数据不可以为空");

        conditions["isDelete"] = false;
        update["updateTime"] = new Date();
        let award = await this.model.findOneAndUpdate(conditions, {$set: update}, {new: true});
        console.log("AwardService.updateAward award:", award);
        return award;
    }
};
