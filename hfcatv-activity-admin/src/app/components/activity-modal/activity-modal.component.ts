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
		return ActivityHelper.getActivityStatus(
			this.activityForm.value.startTime,
			this.activityForm.value.endTime
		);
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
		this.activityForm = this.formBuilder.group({
			title: ["", [Validators.required]],
			startTime: ["", [Validators.required]],
			endTime: ["", [Validators.required]],
			awards: this.formBuilder.array([this._buildActivityAwardFormGroup()])
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
					console.log("getAwards awards:", awards);
					self.awards = awards;
				},
				error(err: any) {
					console.log("getAwards err:", err);
					message.error(err);
				}
			});
	}

	openActivity() {
		let activityDup: ActivityDocument | undefined = this.activity ? Utils.duplicate<ActivityDocument>(this.activity) : undefined;
		this.activityDup = activityDup;
		if (activityDup) {
			this.activityForm = this.formBuilder.group({
				title: new FormControl(activityDup.title, Validators.required),
				startTime: new FormControl(activityDup.startTime, Validators.required),
				endTime: new FormControl(activityDup.endTime, Validators.required),
				awards: this.formBuilder.array(activityDup.awards.map((activityAward: ActivityAwardDocument) => this._buildActivityAwardFormGroup(activityAward)))
			});
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

		let activityDup = this.activityDup || {};
		for (let key in formData) {
			let value = formData[key];
			activityDup[key] = value;
		}
		this.onOk.emit(<ActivityDocument>activityDup);
	}

	addActivityAward() {
		(this.activityForm.controls["awards"] as FormArray).push(this._buildActivityAwardFormGroup());
	}

	removeActivityAward(id: number) {
		(this.activityForm.controls["awards"] as FormArray).removeAt(id);
	}
}
