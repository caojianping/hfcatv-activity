import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {Utils} from "../../../ts/common/utils";
import {AwardTypes} from "../../../ts/common/names";
import {AwardDocument} from "../../../ts/interfaces";

@Component({
    selector: 'app-award-modal',
    templateUrl: './award-modal.component.html',
    styleUrls: ['./award-modal.component.less']
})
export class AwardModalComponent implements OnInit {
    @Input() type: string;
    @Input() visible: boolean;
    @Input() award?: AwardDocument;

    @Output() onCancel = new EventEmitter<void>();
    @Output() onOk = new EventEmitter<AwardDocument>();

    AwardTypes: Array<string> = AwardTypes;
    awardForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.awardForm = this.formBuilder.group({
            name: new FormControl(null, Validators.required),
            type: new FormControl(null, Validators.required),
        });
    }

    ngOnInit() {
    }

    openAward() {
        let type = this.type;
        if(type === "add"){
            this.awardForm = this.formBuilder.group({
                name: new FormControl(null, Validators.required),
                type: new FormControl(null, Validators.required),
            });
        } else if(type === "edit"){
            let award = this.award;
            if (award) {
                this.awardForm = this.formBuilder.group({
                    name: new FormControl(award.name, Validators.required),
                    type: new FormControl(award.type, Validators.required),
                });
            }
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

        let type = this.type;
        if (type === "add") {
            this.onOk.emit(<AwardDocument>formData);
        } else if (type === "edit") {
            formData["_id"] = this.award._id;
            this.onOk.emit(<AwardDocument>formData);
        }
    }
}
