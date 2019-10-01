import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd";
import {OperateType} from "../../../ts/common/enums";
import {ActivityStatuses, AwardRanks, OperateTypes} from "../../../ts/common/names";
import {ActivityDocument, AwardDocument, AwardVO} from "../../../ts/interfaces";
import {ActivityHelper} from "../../../ts/helpers";
import {AwardService} from "../../../ts/services";

@Component({
    selector: 'app-activity-modal',
    templateUrl: './activity-modal.component.html',
    styleUrls: ['./activity-modal.component.less']
})
export class ActivityModalComponent implements OnInit {
    @Input() type: OperateType;
    @Input() visible: boolean;
    @Input() activity?: ActivityDocument<AwardVO>;

    @Output() onCancel = new EventEmitter<void>();
    @Output() onOk = new EventEmitter<ActivityDocument<AwardVO>>();

    ActivityStatuses: Array<string> = ActivityStatuses;
    AwardRanks: Array<string> = AwardRanks;
    OperateTypes: Array<string> = OperateTypes;

    awards: Array<AwardDocument>;
    activityForm: FormGroup;

    get activityStatus() {
        let formData = this.activityForm.value;
        let {startTime, endTime} = formData;
        return startTime && endTime ? ActivityHelper.getActivityStatus(startTime, endTime) : null;
    }

    constructor(
        private formBuilder: FormBuilder,
        private message: NzMessageService,
        private awardService: AwardService
    ) {
        this.activityForm = this.formBuilder.group({
            title: new FormControl(null, Validators.required),
            startTime: new FormControl(null, Validators.required),
            endTime: new FormControl(null, Validators.required),
            awards: this.formBuilder.array([this._buildAwardFormGroup()])
        });
    }

    ngOnInit() {
        this.fetchAwards();
    }

    _buildAwardFormGroup(award?: AwardVO) {
        if (award) {
            return this.formBuilder.group({
                id: new FormControl(award.id, Validators.required),
                rank: new FormControl(award.rank, Validators.required),
                stock: new FormControl(award.stock, Validators.min(0)),
                weight: new FormControl(award.weight, [Validators.min(0), Validators.max(1)])
            });
        } else {
            return this.formBuilder.group({
                id: new FormControl(null, Validators.required),
                rank: new FormControl(null, Validators.required),
                stock: new FormControl(null, [Validators.required, Validators.min(0)]),
                weight: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(1)])
            });
        }
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
        let self = this,
            formBuilder = this.formBuilder,
            type = this.type;
        if (type === OperateType.Add) {
            this.activityForm = formBuilder.group({
                title: new FormControl(null, Validators.required),
                startTime: new FormControl(null, Validators.required),
                endTime: new FormControl(null, Validators.required),
                awards: formBuilder.array([this._buildAwardFormGroup()])
            });
        } else if (type === OperateType.Edit) {
            let activity = this.activity;
            if (activity) {
                let awardForms: Array<any> = [];
                activity.awards.forEach((award: any) => {
                    awardForms.push(self._buildAwardFormGroup(award));
                });
                this.activityForm = formBuilder.group({
                    title: new FormControl(activity.title, Validators.required),
                    startTime: new FormControl(new Date(activity.startTime), Validators.required),
                    endTime: new FormControl(new Date(activity.endTime), Validators.required),
                    awards: formBuilder.array(awardForms)
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
        if (type === OperateType.Add) {
            this.onOk.emit(<ActivityDocument<AwardVO>>formData);
        } else if (type === OperateType.Edit) {
            formData["_id"] = this.activity._id;
            this.onOk.emit(<ActivityDocument<AwardVO>>formData);
        }
    }

    addActivityAward() {
        let awardsForms = this.activityForm.get("awards") as FormArray;
        awardsForms.push(this._buildAwardFormGroup());
    }

    removeActivityAward(id: number) {
        let awardsForms = this.activityForm.get("awards") as FormArray;
        awardsForms.removeAt(id);
    }
}
