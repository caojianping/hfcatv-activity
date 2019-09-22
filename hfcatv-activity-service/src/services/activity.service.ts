import {ActivityStatus} from "../common/enums";
import {ActivityDocument, ActivityModel, ActivityAwardDocument} from "../models";
import {ActivityHelper} from "../helpers";
import BaseService from "./base.service";

export default class ActivityService extends BaseService {
    constructor() {
        super(ActivityModel);
    }

    async getActivity(): Promise<ActivityDocument> {
        let activities = await this.model.find({status: {$ne: ActivityStatus.Finished}, isDelete: false},
            null, {sort: {createTime: -1}, limit: 1})
            .populate({path: "awards.award", model: "award", select: "name type"});
        console.log("ActivityService.getActivity activities:", activities);
        return activities[0];
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
        let activity = await this.model.findOneAndUpdate(conditions, {$set: update}, {new: true});
        console.log("ActivityService.updateActivity activity:", activity);
        return activity;
    }

    async setStatus(id: string, status: ActivityStatus): Promise<ActivityDocument> {
        if (!id) return Promise.reject("活动编号不可以为空");

        let activity = await this.model.findByIdAndUpdate(id,
            {$set: {status: status, updateTime: new Date()}}, {new: true});
        console.log("ActivityService.setStatus activity:", activity);
        return activity;
    }

    async isFinished(id: string): Promise<boolean> {
        if (!id) return Promise.reject("活动编号不可以为空");

        let activity: ActivityDocument = await this.model.findById(id);
        if (!activity) return Promise.reject("该活动不存在");

        let status = ActivityHelper.getActivityStatus(activity.startTime, activity.endTime);
        if (status !== activity.status) {
            await this.setStatus(id, status);
        }
        return status === ActivityStatus.Finished;
    }

    async getActivityAwards(id: string): Promise<Array<ActivityAwardDocument>> {
        if (!id) return Promise.reject("活动编号不可以为空");

        let activity = await this.model.findById(id)
            .populate({path: "awards.award", model: "award", select: "name type"});
        if (!activity) return Promise.reject("该活动不存在");

        return activity.awards || [];
    }

    async getActivityAward(id: string, awardId: string): Promise<ActivityAwardDocument> {
        if (!id) return Promise.reject("活动编号不可以为空");
        if (!awardId) return Promise.reject("奖品编号不可以为空");

        let activity = await this.model.findById(id)
            .populate({path: "awards.award", model: "award", select: "name type"});
        if (!activity) return Promise.reject("该活动不存在");

        let activityAwards: Array<ActivityAwardDocument> = activity.awards || [];
        return activityAwards.filter((activityAward: ActivityAwardDocument) =>
            activityAward.award._id === awardId)[0];
    }
};
