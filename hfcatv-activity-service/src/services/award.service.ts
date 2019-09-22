import BaseService from "./base.service";
import {AwardDocument, AwardModel} from "../models";

export default class AwardService extends BaseService {
    constructor() {
        super(AwardModel);
    }

    async getAwards(): Promise<Array<AwardDocument>> {
        let docs = await this.model.find();
        console.log("AwardService.getAwards docs:", docs);
        return docs;
    }

    async addAward(award: AwardDocument): Promise<Array<AwardDocument>> {
        let doc = await this.model.create(award);
        console.log("AwardService.addAward doc:", doc);
        return doc;
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

        let doc = await this.model.findOneAndUpdate(conditions, update, {new: true});
        console.log("AwardService.updateAward doc:", doc);
        return doc;
    }
};
