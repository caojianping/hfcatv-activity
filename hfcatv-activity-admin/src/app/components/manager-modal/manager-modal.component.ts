import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd";
import {Constants} from "../../../ts/common/constants";
import {OperateType} from "../../../ts/common/enums";
import {OperateTypes, RoleTypes} from "../../../ts/common/names";
import {ManagerDocument} from "../../../ts/interfaces";

@Component({
    selector: "app-manager-modal",
    templateUrl: "./manager-modal.component.html",
    styleUrls: ["./manager-modal.component.less"]
})
export class ManagerModalComponent implements OnInit {
    @Input() type: OperateType;
    @Input() visible: boolean;
    @Input() manager?: ManagerDocument;

    @Output() onCancel = new EventEmitter<void>();
    @Output() onOk = new EventEmitter<ManagerDocument>();

    RoleTypes: Array<string> = RoleTypes;
    OperateTypes: Array<string> = OperateTypes;
    managerForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private message: NzMessageService
    ) {
        this.managerForm = this.formBuilder.group({
            username: new FormControl(null, Validators.required),
            password: new FormControl(null),
            role: new FormControl(null, Validators.required)
        });
    }

    ngOnInit() {
    }

    openManager() {
        let type = this.type;
        if (type === OperateType.Add) {
            this.managerForm = this.formBuilder.group({
                username: new FormControl(null, Validators.required),
                password: new FormControl(null),
                role: new FormControl(null, Validators.required)
            });
        } else if (type === OperateType.Edit) {
            let manager = this.manager;
            if (manager) {
                this.managerForm = this.formBuilder.group({
                    username: new FormControl(manager.username, Validators.required),
                    role: new FormControl(manager.role, Validators.required)
                });
            }
        }
    }

    closeManager() {
        this.onCancel.emit();
    }

    saveManager(formData: any) {
        if (!this.managerForm.valid) {
            for (const i in this.managerForm.controls) {
                this.managerForm.controls[i].markAsDirty();
                this.managerForm.controls[i].updateValueAndValidity();
            }
            return;
        }

        let type = this.type;
        if (type === OperateType.Add) {
            if (!formData.password) {
                formData["password"] = formData.username + Constants.PASSWORD_SUFFIX;
            }
            this.onOk.emit(<ManagerDocument>formData);
        } else if (type === OperateType.Edit) {
            formData["_id"] = this.manager._id;
            this.onOk.emit(<ManagerDocument>formData);
        }
    }
}