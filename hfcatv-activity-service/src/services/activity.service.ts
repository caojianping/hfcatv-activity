import BaseService from "./base.service";
import {ActivityDocument, ActivityModel} from "../models";
import {ActivityStatus} from "../common/enums";

export default class ActivityService extends BaseService {
    constructor() {
        super(ActivityModel);
    }

    async getActivity(): Promise<ActivityDocument> {
        let docs = await this.model.find({status: {$ne: ActivityStatus.Finished}, isDelete: false},
            null, {sort: {createTime: -1}, limit: 1})
            .populate({path: "awards.award", model: "award", select: "name type"});
        console.log("ActivityService.getActivity docs:", docs);
        return docs[0];
    }

    async addActivity(activity: any): Promise<ActivityDocument> {
        if (!activity) return Promise.reject("活动数据不可以为空");

        let result = await this.isExist({status: {$ne: ActivityStatus.Finished}, isDelete: false});
        if (result.status) return Promise.reject("存在未结束的活动");

        let doc = await this.model.create(activity);
        console.log("ActivityService.addActivity doc:", doc);
        return doc;
    }

    async updateActivity(conditions: any, update: any): Promise<ActivityDocument> {
        if (!conditions) return Promise.reject("查询条件不可以为空");
        if (!update) return Promise.reject("更新数据不可以为空");

        conditions["isDelete"] = false;
        update["updateTime"] = new Date();
        let doc = await this.model.findOneAndUpdate(conditions, {$set: update}, {new: true});
        console.log("ActivityService.updateActivity doc:", doc);
        return doc;
    }

    async setStatus(id: string, status: ActivityStatus): Promise<ActivityDocument> {
        if (!id) return Promise.reject("活动编号不可以为空");

        let doc = await this.model.findByIdAndUpdate(id,
            {$set: {status: status, updateTime: new Date()}}, {new: true});
        console.log("ActivityService.setStatus doc:", doc);
        return doc;
    }
};
