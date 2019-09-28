import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd";
import {ManagerService} from "../../../ts/services";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.less"]
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private message: NzMessageService,
		private managerService: ManagerService
	) {
	}

	ngOnInit(): void {
		this.loginForm = this.formBuilder.group({
			username: [null, [Validators.required]],
			password: [null, [Validators.required]],
			remember: [true]
		});
	}

	login(formData: any): void {
		if (!this.loginForm.valid) {
			for (const i in this.loginForm.controls) {
				this.loginForm.controls[i].markAsDirty();
				this.loginForm.controls[i].updateValueAndValidity();
			}
			return;
		}

		const {router, message, managerService} = this;
		managerService.login(formData.username, formData.password)
			.subscribe({
				next(token: any) {
					if (token) {
						let redirectUrl = managerService.redirectUrl ?
							router.parseUrl(managerService.redirectUrl) : "/award";
						router.navigateByUrl(redirectUrl);
					}
				},
				error(err: any) {
					message.error(err);
				}
			});
	}
}
