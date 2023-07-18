import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {Utils} from "../../../ts/common/utils";
import {OperateType} from "../../../ts/common/enums";
import {ActivityStatuses, AwardRanks, AwardTypes} from "../../../ts/common/names";
import {ActivityDocument, AwardVO, PaginateResult} from "../../../ts/interfaces";
import {ActivityService} from "../../../ts/services";

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
    activityPageResult: PaginateResult<ActivityDocument<AwardVO>> = {
        docs: [],
        total: 0,
        page: 1,
        limit: 10
    };

    type: OperateType = OperateType.Add;
    isVisible: boolean = false;
    currentActivity?: ActivityDocument<AwardVO>;

    constructor(
        private formBuilder: FormBuilder,
        private modal: NzModalService,
        private message: NzMessageService,
        private activityService: ActivityService
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
            next(result: PaginateResult<ActivityDocument<AwardVO>>) {
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
        this.type = OperateType.Add;
        this.currentActivity = undefined;
        this.isVisible = true;
    }

    editActivity(activity: ActivityDocument<AwardVO>) {
        this.type = OperateType.Edit;
        this.currentActivity = activity;
        this.isVisible = true;
    }

    setSwitch(id: string, switcher: boolean) {
        const self = this;
        const {message, activityService} = self;
        activityService.setSwitch(id, switcher)
        .subscribe({
            next(result: boolean) {
                if (!result) message.error("活动设置失败");
                else self.fetchPageActivities();
            },
            error(err: any) {
                message.error(err);
            }
        });
    }

    removeActivity(id: string) {
        const self = this;
        const {modal, message, activityService} = self;
        modal.confirm({
            nzTitle: "确定要删除此活动吗？",
            nzOnOk() {
                activityService.removeActivity(id)
                .subscribe({
                    next(result: boolean) {
                        if (!result) message.error("删除失败");
                        else self.fetchPageActivities();
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

    handleModalOk(activity: ActivityDocument<AwardVO>) {
        const self = this;
        const {message, activityService, type} = self;
        if (type === OperateType.Add) {
            activityService.addActivity(activity)
            .subscribe({
                next(data: ActivityDocument<AwardVO>) {
                    self.fetchPageActivities();
                    self.isVisible = false;
                },
                error(err: any) {
                    message.error(err);
                    self.isVisible = false;
                }
            });
        } else if (type === OperateType.Edit) {
            activityService.updateActivity(<ActivityDocument<AwardVO>>activity)
            .subscribe({
                next(data: ActivityDocument<AwardVO>) {
                    self.fetchPageActivities();
                    self.isVisible = false;
                },
                error(err: any) {
                    message.error(err);
                    self.isVisible = false;
                }
            });
        }
    }

    handleModalChange(data: any) {
        const self = this;
        const {message, activityService} = self;
        const type = data.type;
        if (type === 0) {
            const {id, award} = data;
            activityService.setAward(id, award)
            .subscribe({
                next(result: boolean) {
                    result && self.fetchPageActivities();
                    self.isVisible = false;
                },
                error(err: any) {
                    message.error(err);
                    self.isVisible = false;
                }
            });
        } else if (type === 1) {
            const {id, awardId} = data;
            activityService.removeAward(id, awardId)
            .subscribe({
                next(result: boolean) {
                    result && self.fetchPageActivities();
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
