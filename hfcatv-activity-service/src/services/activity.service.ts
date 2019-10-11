import {PaginateResult} from "mongoose";
import {BusinessError, ErrorType} from "../error";
import {Utils} from "../common/utils";
import {ActivityStatus} from "../common/enums";
import {ActivityDocument, AwardDetailDocument, AwardBaseVO, AwardVO} from "../interfaces";
import {ActivityModel} from "../models";
import {ActivityHelper, AwardHelper} from "../helpers";
import BaseService from "./base.service";

export default class ActivityService extends BaseService {
	private populates: Array<any> = [{path: "awards.award", model: "award"}];

	constructor() {
		super(ActivityModel);
	}

	private _buildActivity(activity: ActivityDocument<AwardDetailDocument>, isBase: boolean = false) {
		let activityDup: any = Utils.duplicate<any>(activity);
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

	private _handleActivity(activity: any) {
		let {startTime, endTime} = activity;
		activity["status"] = ActivityHelper.getActivityStatus(new Date(startTime), new Date(endTime));
		let awards: any = Utils.duplicate<any>(activity.awards || []);
		if (awards.length > 0) {
			awards = awards.map((item: any) => ({
				award: item.id,
				rank: item.rank,
				stock: item.stock,
				weight: item.weight
			}));
		}
		activity["awards"] = awards;
		return activity;
	}


	async getActivity(): Promise<ActivityDocument<AwardBaseVO> | null> {
		let conditions = {status: {$ne: ActivityStatus.Finished}, isDelete: false},
			projection = "_id title startTime endTime status awards",
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

	async getPageActivitiesByConditions(conditions: any, page: number, limit: number): Promise<PaginateResult<ActivityDocument<AwardVO>>> {
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

		let activities = await this.model.find({title: {$regex: title}});
		return activities.map((activity: any) => activity._id);
	}

	async addActivity(activity: any): Promise<ActivityDocument<AwardVO> | null> {
		if (!activity) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动]`));

		let {startTime, endTime} = activity;
		if (!startTime) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动开始时间]`));
		if (!endTime) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动结束时间]`));
		if (new Date(startTime).getTime() > new Date(endTime).getTime())
			return Promise.reject(new BusinessError(ErrorType.Others.code, `${ErrorType.Others.message}:[开始时间不可以大于结束时间]`));

		let result = await this.isExist({status: {$ne: ActivityStatus.Finished}, isDelete: false});
		if (result.status) return Promise.reject(new BusinessError(ErrorType.Others.code, `${ErrorType.Others.message}:[存在未结束的活动]`));
		else {
			activity["createTime"] = new Date();
			let doc = await this.model.create(this._handleActivity(activity));
			if (!doc) return null;
			return this._buildActivity(doc, false);
		}
	}

	async updateActivity(id: string, update: any): Promise<ActivityDocument<AwardVO> | null> {
		if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[查询条件]`));
		if (!update) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[更新数据]`));

		update["updateTime"] = new Date();
		let doc = await this.model.findByIdAndUpdate(id,
			{$set: this._handleActivity(update)}, {new: true}).populate(this.populates);
		if (!doc) Promise.reject(new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[活动信息]`));
		return this._buildActivity(doc, false);
	}

	async setStatus(id: string, status: ActivityStatus): Promise<ActivityDocument<AwardVO> | null> {
		if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动编号]`));

		let update = {
				$set: {
					status: status,
					updateTime: new Date()
				}
			},
			doc = await this.model.findByIdAndUpdate(id, update, {new: true}).populate(this.populates);
		if (!doc) Promise.reject(new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[活动信息]`));
		return this._buildActivity(doc, false);
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

		let activity = await this.model.findById(id).populate(this.populates);
		if (!activity) return Promise.reject(new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[活动]`));
		return activity.awards || [];
	}

	async reduceStock(id: string, awardId: string): Promise<boolean> {
		if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[活动编号]`));
		if (!awardId) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[奖品编号]`));

		let activity = await this.model.findOneAndUpdate(
			{_id: id, "awards.award": awardId},
			{$inc: {"awards.$.stock": -1}}
		);
		return !!activity;
	}
};
