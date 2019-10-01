import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {OperateType} from "../../../ts/common/enums";
import {AwardTypes, OperateTypes} from "../../../ts/common/names";
import {AwardDocument} from "../../../ts/interfaces";

@Component({
    selector: "app-award-modal",
    templateUrl: "./award-modal.component.html",
    styleUrls: ["./award-modal.component.less"]
})
export class AwardModalComponent implements OnInit {
    @Input() type: OperateType;
    @Input() visible: boolean;
    @Input() award?: AwardDocument;

    @Output() onCancel = new EventEmitter<void>();
    @Output() onOk = new EventEmitter<AwardDocument>();

    AwardTypes: Array<string> = AwardTypes;
    OperateTypes: Array<string> = OperateTypes;
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
        if (type === OperateType.Add) {
            this.awardForm = this.formBuilder.group({
                name: new FormControl(null, Validators.required),
                type: new FormControl(null, Validators.required),
            });
        } else if (type === OperateType.Edit) {
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
        if (type === OperateType.Add) {
            this.onOk.emit(<AwardDocument>formData);
        } else if (type === OperateType.Edit) {
            formData["_id"] = this.award._id;
            this.onOk.emit(<AwardDocument>formData);
        }
    }
}
