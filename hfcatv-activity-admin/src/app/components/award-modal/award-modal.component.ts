import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Utils} from "../../../ts/common/utils";
import {AwardTypes} from "../../../ts/common/names";
import {AwardDocument} from "../../../ts/interfaces";

@Component({
	selector: 'app-award-modal',
	templateUrl: './award-modal.component.html',
	styleUrls: ['./award-modal.component.less']
})
export class AwardModalComponent implements OnInit {
	@Input() visible: boolean;
	@Input() award?: AwardDocument;

	@Output() onCancel = new EventEmitter<void>();
	@Output() onOk = new EventEmitter<AwardDocument>();

	AwardTypes: Array<string> = AwardTypes;
	awardDup?: AwardDocument;
	awardForm: FormGroup;

	constructor(private formBuilder: FormBuilder) {
		this.awardForm = this.formBuilder.group({
			name: ["", [Validators.required]],
			type: ["", [Validators.required]]
		});
	}

	ngOnInit() {
	}

	openAward() {
		let awardDup: AwardDocument | undefined = this.award ? Utils.duplicate<AwardDocument>(this.award) : undefined;
		this.awardDup = awardDup;
		if (awardDup) {
			this.awardForm = this.formBuilder.group({
				name: [awardDup.name, [Validators.required]],
				type: [awardDup.type, [Validators.required]]
			});
		}
	}

	closeAward() {
		this.onCancel.emit();
	}

	saveAward(formData: any) {
		if (!this.awardForm.valid) {
			for (const i in this.awardForm.controls) {
				this.awardForm.controls[i].markAsDirty();
				this.awardForm.controls[i].updateValueAndValidity();
			}
			return;
		}
		let awardDup = this.awardDup || {};
		for (let key in formData) {
			let value = formData[key];
			awardDup[key] = value;
		}
		this.onOk.emit(<AwardDocument>awardDup);
	}
}
