import {BusinessError, ErrorType} from "../error";
import {ActivityStatus} from "../common/enums";
import {ActivityDocument, ActivityModel, ActivityAwardDocument} from "../models";
import {ActivityHelper} from "../helpers";
import BaseService from "./base.service";

export default class ActivityService extends BaseService {
    constructor() {
        super(ActivityModel);
    }

    async getActivity(): Promise<ActivityDocument | null> {
        let activities = await this.model.find({
            status: {$ne: ActivityStatus.Finished},
            isDelete: false
        }, null, {sort: {createTime: -1}, limit: 1})
            .populate({path: "awards.award", model: "award", select: "name type"});
        return activities[0] || null;
    }

    async addActivity(activity: any): Promise<ActivityDocument | null> {
        if (!activity) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动]`));

        let result = await this.isExist({status: {$ne: ActivityStatus.Finished}, isDelete: false});
        if (result.status) return Promise.reject(new BusinessError(ErrorType.Others.code, `${ErrorType.Others.message}:[存在未结束的活动]`));
        return await this.model.create(activity);
    }

    async updateActivity(conditions: any, update: any): Promise<ActivityDocument> {
        if (!conditions) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[查询条件]`));
        if (!update) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[更新数据]`));

        conditions["isDelete"] = false;
        update["updateTime"] = new Date();
        return await this.model.findOneAndUpdate(conditions, {$set: update}, {new: true});
    }

    async setStatus(id: string, status: ActivityStatus): Promise<ActivityDocument> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动编号]`));
        return await this.model.findByIdAndUpdate(id, {$set: {status: status, updateTime: new Date()}}, {new: true});
    }

    async isFinished(id: string): Promise<boolean> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动编号]`));

        let activity: ActivityDocument = await this.model.findById(id);
        if (!activity) return Promise.reject(new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[活动]`));

        let status = ActivityHelper.getActivityStatus(activity.startTime, activity.endTime);
        if (status !== activity.status) {
            await this.setStatus(id, status);
        }
        return status === ActivityStatus.Finished;
    }

    async getActivityAwards(id: string): Promise<Array<ActivityAwardDocument>> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动编号]`));

        let activity = await this.model.findById(id).populate({
            path: "awards.award",
            model: "award",
            select: "name type"
        });
        if (!activity) return Promise.reject(new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[活动]`));
        return activity.awards || [];
    }

    async getActivityAward(id: string, awardId: string): Promise<ActivityAwardDocument> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动编号]`));
        if (!awardId) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[奖品编号]`));

        let activity = await this.model.findById(id).populate({
            path: "awards.award",
            model: "award",
            select: "name type"
        });
        if (!activity) return Promise.reject(new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[活动]`));

        let activityAwards: Array<ActivityAwardDocument> = activity.awards || [];
        return activityAwards.filter((activityAward: ActivityAwardDocument) => activityAward.award._id === awardId)[0];
    }
};
