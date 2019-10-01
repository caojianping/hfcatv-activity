import {PaginateResult} from "mongoose";
import {BusinessError, ErrorType} from "../error";
import {Utils} from "../common/utils";
import {ActivityStatus} from "../common/enums";
import {ActivityDocument, AwardDetailDocument, AwardBaseVO, AwardVO} from "../interfaces";
import {ActivityModel} from "../models";
import {ActivityHelper, AwardHelper} from "../helpers";
import BaseService from "./base.service";

export default class ActivityService extends BaseService {
    constructor() {
        super(ActivityModel);
    }

    private _buildActivity(activity: ActivityDocument<AwardDetailDocument>, isBase: boolean = false) {
        let activityDup = Utils.duplicate<any>(activity);
        activityDup["awards"] = activityDup.awards
            .map((awardDetail: AwardDetailDocument) => AwardHelper.convertToAwardVO(awardDetail, isBase));
        return activityDup;
    }

    private _buildActivities(activities: Array<ActivityDocument<AwardDetailDocument>>, isBase: boolean = false) {
        let self = this,
            result: Array<any> = [];
        activities.forEach((activity: ActivityDocument<AwardDetailDocument>) => {
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

    async getPageActivitiesByConditions(conditions: any, page: number, limit: number)
        : Promise<PaginateResult<ActivityDocument<AwardVO>>> {
        let options = {
                sort: {createTime: -1},
                populate: [{path: "awards.award", model: "award"}],
                page: page,
                limit: limit
            },
            result: any = await this.getPage<ActivityDocument<AwardDetailDocument>>(conditions, options);
        result["docs"] = this._buildActivities(result.docs, false);
        return <PaginateResult<ActivityDocument<AwardVO>>>result;
    }

    async addActivity(activity: any): Promise<ActivityDocument<AwardVO> | null> {
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
            let data = await this.model.create(activity);
            if (!data) return null;
            return this._buildActivity(data, false);
        }
    }

    async updateActivity(id: string, update: any): Promise<ActivityDocument<AwardVO>> {
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
        let data = await this.model.findByIdAndUpdate(id, {$set: update}, {new: true});
        if (!data) return null;
        return this._buildActivity(data, false);
    }

    async setStatus(id: string, status: ActivityStatus): Promise<ActivityDocument<AwardVO>> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动编号]`));
        let data = await this.model.findByIdAndUpdate(id, {$set: {status: status, updateTime: new Date()}}, {new: true});
        if (!data) return null;
        return this._buildActivity(data, false);
    }

    async isFinished(id: string): Promise<boolean> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动编号]`));

        let activity: ActivityDocument<AwardDetailDocument> = await this.model.findById(id);
        if (!activity) return Promise.reject(new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[活动]`));

        let status = ActivityHelper.getActivityStatus(activity.startTime, activity.endTime);
        if (status !== activity.status) {
            await this.setStatus(id, status);
        }
        return status === ActivityStatus.Finished;
    }

    async getAwardDetails(id: string): Promise<Array<AwardDetailDocument>> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动编号]`));

        let activity = await this.model.findById(id).populate({
            path: "awards.award",
            model: "award",
            select: "name type"
        });
        if (!activity) return Promise.reject(new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[活动]`));
        return activity.awards || [];
    }
};
