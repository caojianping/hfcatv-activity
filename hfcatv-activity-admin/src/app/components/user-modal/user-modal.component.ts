import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd";
import {Utils} from "../../../ts/common/utils";
import {AwardType, OperateType} from "../../../ts/common/enums";
import {AwardExpireTypes, AwardTypes, OperateTypes} from "../../../ts/common/names";
import {UserDocument} from "../../../ts/interfaces";

@Component({
    selector: "app-user-modal",
    templateUrl: "./user-modal.component.html",
    styleUrls: ["./user-modal.component.less"]
})
export class UserModalComponent implements OnInit {
    @Input() visible: boolean;
    @Input() user?: UserDocument;

    @Output() onCancel = new EventEmitter<void>();
    @Output() onOk = new EventEmitter<any>();

    userForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private message: NzMessageService
    ) {
        this.userForm = this.formBuilder.group({
            nickname: new FormControl(null, Validators.required),
            lottoCount: new FormControl(null, Validators.required)
        });
    }

    ngOnInit() {
    }

    openUser() {
        let user = this.user;
        if (user) {
            this.userForm = this.formBuilder.group({
                nickname: new FormControl(user.nickname, Validators.required),
                lottoCount: new FormControl(user.lottoCount, Validators.required)
            });
        }
    }

    closeUser() {
        this.onCancel.emit();
    }

    saveAward(formData: any) {
        if (!this.userForm.valid) {
            for (const i in this.userForm.controls) {
                this.userForm.controls[i].markAsDirty();
                this.userForm.controls[i].updateValueAndValidity();
            }
            return;
        }

        this.onOk.emit({_id: this.user._id, lottoCount: formData.lottoCount});
    }
}
