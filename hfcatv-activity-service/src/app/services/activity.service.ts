import {PaginateResult} from "mongoose";
import {BusinessError, ErrorType} from "../../error/index";
import {Utils} from "../../common/utils";
import {ActivityStatus} from "../../common/enums";
import {ActivityDocument, AwardBaseVO, AwardDetailDocument, AwardVO} from "../interfaces/index";
import {ActivityModel} from "../models/index";
import {ActivityHelper, AwardHelper} from "../../helpers/index";
import BaseService from "./base.service";

export default class ActivityService extends BaseService {
    private populates: Array<any> = [{path: "awards.award", model: "award"}];

    constructor() {
        super(ActivityModel);
    }

    private _buildActivity(activity: ActivityDocument<AwardDetailDocument>, isBase: boolean = false) {
        let activityDup: any = Utils.duplicate<any>(activity);
        activityDup["awards"] = activityDup.awards
            .filter((awardDetail: AwardDetailDocument) => !awardDetail.isDelete)
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

    private _handleActivity(activity: any, isUpdate: boolean = false) {
        let {startTime, endTime} = activity;
        activity["status"] = ActivityHelper.getActivityStatus(new Date(startTime), new Date(endTime));
        if (!isUpdate) {
            let awards: any = Utils.duplicate<any>(activity.awards || []);
            if (awards.length > 0) {
                awards = awards.map((item: any) => ({
                    award: item.id,
                    rank: item.rank,
                    weight: item.weight,
                    totalStock: item.totalStock,
                    remainStock: item.remainStock,
                    isDelete: false
                }));
            }
            activity["awards"] = awards;

            activity["switch"] = false;
            activity["createTime"] = new Date();
            activity["isDelete"] = false;
        } else {
            activity["updateTime"] = new Date();
            delete activity.awards;
        }
        return activity;
    }


    async getActivity(): Promise<ActivityDocument<AwardBaseVO> | null> {
        let conditions = {status: {$ne: ActivityStatus.Finished}, switch: true, isDelete: false},
            projection = "_id title startTime endTime status switch awards",
            options = {
                sort: {createTime: -1},
                populate: this.populates,
                limit: 1
            },
            activities = await this.model.find(conditions, projection, options);

        let activity = activities[0] || null;
        if (!activity) return null;
        else return this._buildActivity(activity, true);
    }

    async getPageActivities(conditions: any, page: number, limit: number): Promise<PaginateResult<ActivityDocument<AwardVO>>> {
        if (!conditions) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[查询条件]`));

        let options = {
                sort: {createTime: -1},
                populate: this.populates,
                page: page,
                limit: limit
            },
            result: any = await this.getPage<ActivityDocument<AwardDetailDocument>>(conditions, options);
        result["docs"] = this._buildActivities(result.docs, false);
        return <PaginateResult<ActivityDocument<AwardVO>>>result;
    }

    async getActivityIdsByTitle(title: string): Promise<Array<string>> {
        if (!title) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动标题]`));

        let activities = await this.model.find({title: {$regex: title}, isDelete: false});
        return activities.map((activity: any) => activity._id);
    }

    async getAwardDetails(id: string): Promise<Array<AwardDetailDocument>> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动编号]`));

        let activity = await this.model.findById(id).populate(this.populates);
        if (!activity) return Promise.reject(new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[活动]`));
        return activity.awards || [];
    }

    async addActivity(activity: any): Promise<ActivityDocument<AwardVO> | null> {
        if (!activity) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动]`));

        let {startTime, endTime} = activity;
        if (!startTime) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[开始时间]`));
        if (!endTime) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[结束时间]`));
        if (new Date(startTime).getTime() > new Date(endTime).getTime()) {
            return Promise.reject(new BusinessError(ErrorType.Others.code, `${ErrorType.Others.message}:[开始时间不可以大于结束时间]`));
        }

        let result = await this.isExist({title: activity.title, isDelete: false});
        if (result.status) return Promise.reject(new BusinessError(ErrorType.DataExist.code, `${ErrorType.DataExist.message}:[活动]`));
        else {
            let doc = await this.model.create(this._handleActivity(activity, false));
            if (!doc) return null;
            return this._buildActivity(doc, false);
        }
    }

    async updateActivity(id: string, update: any): Promise<ActivityDocument<AwardVO> | null> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动编号]`));
        if (!update) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[更新数据]`));

        let doc = await this.model.findByIdAndUpdate(id, {$set: this._handleActivity(update, true)}, {new: true}).populate(this.populates);
        if (!doc) Promise.reject(new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[活动]`));
        return this._buildActivity(doc, false);
    }

    async isClosedOrFinished(id: string): Promise<boolean> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动编号]`));

        let result = await this.isExist({_id: id, isDelete: false});
        if (!result.status) return Promise.reject(new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[活动]`));

        let activity = result.data,
            status = ActivityHelper.getActivityStatus(activity.startTime, activity.endTime);
        if (status !== activity.status) {
            let update = {status: status, updateTime: new Date()};
            await this.model.findByIdAndUpdate(id, {$set: update});
        }
        return !activity.switch || status === ActivityStatus.Finished;
    }

    async setSwitch(id: string, switcher: boolean): Promise<boolean> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动编号]`));

        let result = await this.isExist({_id: id, isDelete: false});
        if (!result.status) return Promise.reject(new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[活动]`));
        else {
            if (switcher) {
                let count = await this.model.count({switch: true, isDelete: false});
                if (count > 0) return Promise.reject(new BusinessError(ErrorType.Others.code, `${ErrorType.Others.message}:[有且只能开启一个活动]`));
            }

            let activity = result.data,
                status = ActivityHelper.getActivityStatus(activity.startTime, activity.endTime);
            if (status === ActivityStatus.Finished && switcher) {
                return Promise.reject(new BusinessError(ErrorType.Others.code, `${ErrorType.Others.message}:[已经结束的活动不可以再开启]`));
            }

            let doc = await this.model.findByIdAndUpdate(id, {$set: {switch: switcher}});
            return !!doc;
        }
    }

    async setAward(id: string, award: any): Promise<boolean> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动编号]`));
        if (!award) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动奖品]`));

        const {id: awardId, rank, weight, stock} = award;
        let activity = await this.model.findOneAndUpdate(
            {_id: id, "awards.award": awardId},
            {
                $set: {
                    "awards.$.award": awardId,
                    "awards.$.rank": rank,
                    "awards.$.weight": weight
                },
                $inc: {
                    "awards.$.totalStock": stock,
                    "awards.$.remainStock": stock
                }
            }
        );
        return !!activity;
    }

    async removeAward(id: string, awardId: string): Promise<boolean> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动编号]`));
        if (!awardId) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[奖品编号]`));

        let activity = await this.model.findOneAndUpdate(
            {_id: id, "awards.award": awardId},
            {$inc: {"awards.$.isDelete": false}}
        );
        return !!activity;
    }

    async reduceStock(id: string, awardId: string): Promise<boolean> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动编号]`));
        if (!awardId) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[奖品编号]`));

        let activity = await this.model.findOneAndUpdate(
            {_id: id, "awards.award": awardId},
            {$inc: {"awards.$.remainStock": -1}}
        );
        return !!activity;
    }
};
