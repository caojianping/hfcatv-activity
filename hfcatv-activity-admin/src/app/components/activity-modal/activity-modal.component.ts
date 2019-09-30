import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd";
import {Utils} from "../../../ts/common/utils";
import {ActivityStatuses, AwardRanks} from "../../../ts/common/names";
import {ActivityAwardDocument, ActivityDocument, AwardDocument} from "../../../ts/interfaces";
import {ActivityHelper} from "../../../ts/helpers";
import {AwardService} from "../../../ts/services";

@Component({
    selector: 'app-activity-modal',
    templateUrl: './activity-modal.component.html',
    styleUrls: ['./activity-modal.component.less']
})
export class ActivityModalComponent implements OnInit {
    @Input() type: string;
    @Input() visible: boolean;
    @Input() activity?: ActivityDocument;

    @Output() onCancel = new EventEmitter<void>();
    @Output() onOk = new EventEmitter<ActivityDocument>();

    ActivityStatuses: Array<string> = ActivityStatuses;
    AwardRanks: Array<string> = AwardRanks;

    awards: Array<AwardDocument>;
    activityDup?: ActivityDocument;
    activityForm: FormGroup;

    get activityStatus() {
        let formData = this.activityForm.value;
        let {startTime, endTime} = formData;
        return startTime && endTime ? ActivityHelper.getActivityStatus(startTime, endTime): null;
    }

    _buildActivityAwardFormGroup(activityAward?: ActivityAwardDocument) {
        if (activityAward) {
            return new FormGroup({
                awardId: new FormControl(activityAward.award._id, Validators.required),
                rank: new FormControl(activityAward.rank, Validators.required),
                stock: new FormControl(activityAward.stock, Validators.min(0)),
                weight: new FormControl(activityAward.weight, [Validators.min(0), Validators.max(1)])
            });
        } else {
            return new FormGroup({
                awardId: new FormControl(null, Validators.required),
                rank: new FormControl(null, Validators.required),
                stock: new FormControl(null, Validators.min(0)),
                weight: new FormControl(null, [Validators.min(0), Validators.max(1)])
            });
        }
    }

    constructor(
        private message: NzMessageService,
        private formBuilder: FormBuilder,
        private awardService: AwardService
    ) {
        const tformBuilder = this.formBuilder;
        this.activityForm = tformBuilder.group({
            title: new FormControl(null, Validators.required),
            startTime: new FormControl(null, Validators.required),
            endTime: new FormControl(null, Validators.required),
            awards: tformBuilder.array([this._buildActivityAwardFormGroup()])
        });
    }

    ngOnInit() {
        this.fetchAwards();
    }

    fetchAwards() {
        let self = this;
        const {message, awardService} = self;
        awardService.getAwards()
            .subscribe({
                next(awards: Array<AwardDocument>) {
                    self.awards = awards;
                },
                error(err: any) {
                    message.error(err);
                }
            });
    }

    openActivity() {
        let formBuilder = this.formBuilder,
            type = this.type;
        if (type === "add") {
            this.activityForm = formBuilder.group({
                title: new FormControl(null, Validators.required),
                startTime: new FormControl(null, Validators.required),
                endTime: new FormControl(null, Validators.required),
                awards: formBuilder.array([this._buildActivityAwardFormGroup()])
            });
        } else if (type === "edit") {
            let activity = this.activity;
            if (activity) {
                this.activityForm = formBuilder.group({
                    title: new FormControl(activity.title, Validators.required),
                    startTime: new FormControl(activity.startTime, Validators.required),
                    endTime: new FormControl(activity.endTime, Validators.required),
                    awards: formBuilder.array(activity.awards.map((activityAward: ActivityAwardDocument) => this._buildActivityAwardFormGroup(activityAward)))
                });
            }
        }
    }

    closeActivity() {
        this.onCancel.emit();
    }

    saveActivity(formData: any) {
        if (!this.activityForm.valid) {
            for (const i in this.activityForm.controls) {
                this.activityForm.controls[i].markAsDirty();
                this.activityForm.controls[i].updateValueAndValidity();
            }
            return;
        }

        let type = this.type;
        if (type === "add") {
            this.onOk.emit(<ActivityDocument>formData);
        } else if (type === "edit") {
            formData["_id"] = this.activity._id;
            this.onOk.emit(<ActivityDocument>formData);
        }
    }

    addActivityAward() {
        (this.activityForm.controls["awards"] as FormArray).push(this._buildActivityAwardFormGroup());
    }

    removeActivityAward(id: number) {
        (this.activityForm.controls["awards"] as FormArray).removeAt(id);
    }
}
