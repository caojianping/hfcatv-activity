import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd";
import {ManagerService} from "../../../ts/services";

@Component({
    selector: "app-password",
    templateUrl: "./password.component.html",
    styleUrls: ["./password.component.less"]
})
export class PasswordComponent implements OnInit {
    managerForm: FormGroup;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private message: NzMessageService,
        private managerService: ManagerService
    ) {
    }

    ngOnInit() {
        this.managerForm = this.formBuilder.group({
            password: new FormControl(null, Validators.required),
            confirmPassword: new FormControl(null, Validators.required)
        });
    }

    modifyPassword(formData: any): void {
        if (!this.managerForm.valid) {
            for (const i in this.managerForm.controls) {
                this.managerForm.controls[i].markAsDirty();
                this.managerForm.controls[i].updateValueAndValidity();
            }
            return;
        }

        const {router, message, managerService} = this;
        const {password, confirmPassword} = formData;
        if (password !== confirmPassword) {
            message.warning("两次密码不一致");
            return;
        }

        let msgDf = message.loading("密码修改中……");
        managerService.setPassword(password)
            .subscribe({
                next(result: boolean) {
                    if (!result) {
                        message.remove(msgDf.messageId);
                        message.error("密码修改失败");
                    } else {
                        setTimeout(() => {
                            message.remove(msgDf.messageId);
                            message.success("密码修改成功，请重新登录");
                            router.navigateByUrl("/login");
                        }, 1688);
                    }
                },
                error(err: any) {
                    message.remove(msgDf.messageId);
                    message.error(err);
                }
            });
    }
}
