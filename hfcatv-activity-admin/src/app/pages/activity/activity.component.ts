import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {ActivityStatuses, AwardRanks, AwardTypes} from "../../../ts/common/names";
import {ActivityDocument, PaginateResult} from "../../../ts/interfaces";
import {ActivityService} from "../../../ts/services";
import {Utils} from "../../../ts/common/utils";

@Component({
	selector: 'app-activity',
	templateUrl: './activity.component.html',
	styleUrls: ['./activity.component.less']
})
export class ActivityComponent implements OnInit {
	ActivityStatuses: Array<string> = ActivityStatuses;
	AwardTypes: Array<string> = AwardTypes;
	AwardRanks: Array<string> = AwardRanks;

	queryForm: any;

	isLoading: boolean = false;
	activityPageResult: PaginateResult<ActivityDocument> = {
		docs: [],
		total: 0,
		limit: 10,
		page: 1
	};

	type: string = "";
	isVisible: boolean = false;
	currentActivity?: ActivityDocument;

	dateFormat: Function = Utils.dateFormat;
	dateLine: Function = Utils.dateLine;

	constructor(
		private message: NzMessageService,
		private modal: NzModalService,
		private activityService: ActivityService,
		private formBuilder: FormBuilder
	) {
		this.queryForm = this.formBuilder.group({
			title: new FormControl(null),
			status: new FormControl(null)
		});
	}

	ngOnInit() {
	    this.fetchPageActivities();
	}

	fetchPageActivities(key?: string, $event?: number) {
		const self = this;
		if (key && $event) {
			self.activityPageResult[key] = $event;
		}

		const {message, activityService, queryForm, activityPageResult} = self;
		self.isLoading = true;
		activityService.getPageActivities(Utils.filterConditions(queryForm.value), activityPageResult.page, activityPageResult.limit)
			.subscribe({
				next(result: PaginateResult<ActivityDocument>) {
					self.isLoading = false;
					self.activityPageResult = result;
				},
				error(err: any) {
					self.isLoading = false;
					message.error(err);
				}
			})
	}

	queryActivities() {
		if (!this.queryForm.valid) {
			for (const i in this.queryForm.controls) {
				this.queryForm.controls[i].markAsDirty();
				this.queryForm.controls[i].updateValueAndValidity();
			}
			return;
		}

		this.fetchPageActivities();
	}

	addActivity() {
	    this.type = "add";
		this.currentActivity = undefined;
		this.isVisible = true;
	}

	editActivity(activity: ActivityDocument) {
        this.type = "edit";
		this.currentActivity = activity;
		this.isVisible = true;
	}

	removeActivity(id: string) {
		const self = this;
		const {message, modal, activityService} = self;
		modal.confirm({
			nzTitle: "确定要删除此活动吗？",
			nzOnOk() {
				activityService.removeActivity(id)
					.subscribe({
						next(result: boolean) {
							if (!result) message.error("删除失败");
							self.fetchPageActivities();
						},
						error(err: any) {
							message.error(err);
						}
					});
			}
		});
	}

	handleModalCancel() {
		this.isVisible = false;
	}

	handleModalOk(activity: ActivityDocument) {
		const self = this;
		const {message, activityService, activityPageResult, type} = self;
		if(type === "add"){
		    activityService.addActivity(activity)
                .subscribe({
                    next(data: ActivityDocument) {
                        self.fetchPageActivities();
                        self.isVisible = false;
                    },
                    error(err: any) {
                        message.error(err);
                        self.isVisible = false;
                    }
                });
        }else if(type === "edit"){
            activityService.updateActivity(<ActivityDocument>activity)
                .subscribe({
                    next(data: ActivityDocument) {
                        let activities = activityPageResult.docs;
                        activities.forEach((activity: ActivityDocument) => {
                            if (activity._id === data._id) {
                                for (let key in data) {
                                    let value = data[key];
                                    if (key !== "_id") {
                                        activity[key] = value;
                                    }
                                }
                            }
                        });
                        self.activityPageResult["docs"] = activities;
                        self.isVisible = false;
                    },
                    error(err: any) {
                        message.error(err);
                        self.isVisible = false;
                    }
                });
        }
	}
}
