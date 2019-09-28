import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";
import {ManagerService} from "../../../ts/services";

@Component({
	selector: 'app-manager',
	templateUrl: './manager.component.html',
	styleUrls: ['./manager.component.less']
})
export class ManagerComponent implements OnInit {
	managerForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private message: NzMessageService,
		private managerService: ManagerService
	) {
	}

	ngOnInit() {
		this.managerForm = this.formBuilder.group({
			password: [null, [Validators.required]],
			confirmPassword: [null, [Validators.required]]
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

		managerService.setPassword(password)
			.subscribe({
				next(result: boolean) {
					if (result) {
						message.success("密码修改成功，请重新登录");
						setTimeout(() => {
							router.navigateByUrl("/login");
						}, 1688);
					} else {
						message.error("密码修改失败");
					}
				},
				error(err: any) {
					message.error(err);
				}
			});
	}
}
