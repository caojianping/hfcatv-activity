import {PaginateResult} from "mongoose";
import {BusinessError, ErrorType} from "../error";
import {Utils} from "../common/utils";
import {ActivityStatus} from "../common/enums";
import {ActivityDocument, ActivityAwardDocument, AwardVO, AwardBaseVO} from "../interfaces";
import {ActivityModel} from "../models";
import {ActivityHelper, AwardHelper} from "../helpers";
import BaseService from "./base.service";

export default class ActivityService extends BaseService {
    constructor() {
        super(ActivityModel);
    }

    private _buildActivity(activity: ActivityDocument<ActivityAwardDocument>, isBase: boolean = false) {
        let activityDup = Utils.duplicate<any>(activity);
        activityDup["awards"] = activityDup.awards
            .map((activityAward: ActivityAwardDocument) => AwardHelper.convertToAwardVO(activityAward, isBase));
        return activityDup;
    }

    private _buildActivities(activities: Array<ActivityDocument<ActivityAwardDocument>>, isBase: boolean = false) {
        let self = this,
            result: Array<any> = [];
        activities.forEach((activity: ActivityDocument<ActivityAwardDocument>) => {
            let data = self._buildActivity(activity, isBase);
            result.push(data);
        });
        return result;
    }

    async getActivity(): Promise<ActivityDocument<AwardBaseVO>> {
        let conditions = {status: {$ne: ActivityStatus.Finished}, isDelete: false},
            projection = "_id title startTime endTime status awards",
            options = {
                sort: {createTime: -1},
                populate: [{path: "awards.award", model: "award"}],
                limit: 1
            },
            activities = await this.model.find(conditions, projection, options);

        let activity = activities[0] || null;
        if (!activity) return null;
        else return this._buildActivity(activity, true);
    }

    async getPageActivitiesByConditions(conditions: any, page: number, limit: number): Promise<PaginateResult<any>> {
        let options = {
                sort: {createTime: -1},
                populate: [{path: "awards.award", model: "award"}],
                page: page,
                limit: limit
            },
            result = await this.getPage<ActivityDocument<ActivityAwardDocument>>(conditions, options);
        result["docs"] = this._buildActivities(result.docs, false);
        return result;
    }

    async addActivity(activity: any): Promise<ActivityDocument<ActivityAwardDocument> | null> {
        if (!activity) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动]`));

        let result = await this.isExist({status: {$ne: ActivityStatus.Finished}, isDelete: false});
        if (result.status) return Promise.reject(new BusinessError(ErrorType.Others.code, `${ErrorType.Others.message}:[存在未结束的活动]`));
        else {
            let awards: any = activity.awards || [];
            if (awards.length > 0) {
                awards.forEach((item: any) => ({
                    award: item.id,
                    rank: item.rank,
                    stock: item.stock,
                    weight: item.weight
                }));
            }
            return await this.model.create(activity);
        }
    }

    async updateActivity(id: string, update: any): Promise<ActivityAwardDocument> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[查询条件]`));
        if (!update) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[更新数据]`));

        update["updateTime"] = new Date();
        let awards: any = update.awards || [];
        if (awards.length > 0) {
            awards.forEach((item: any) => ({
                award: item.id,
                rank: item.rank,
                stock: item.stock,
                weight: item.weight
            }));
        }
        return await this.model.findByIdAndUpdate(id, {$set: update}, {new: true});
    }

    async setStatus(id: string, status: ActivityStatus): Promise<ActivityDocument<ActivityAwardDocument>> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动编号]`));
        return await this.model.findByIdAndUpdate(id, {$set: {status: status, updateTime: new Date()}}, {new: true});
    }

    async isFinished(id: string): Promise<boolean> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动编号]`));

        let activity: ActivityDocument<ActivityAwardDocument> = await this.model.findById(id);
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
