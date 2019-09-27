import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ManagerService} from "../../services";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;

	constructor(
	    private formBuilder: FormBuilder,
        private router: Router,
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
		// for (const i in this.validateForm.controls) {
		// 	this.validateForm.controls[i].markAsDirty();
		// 	this.validateForm.controls[i].updateValueAndValidity();
		// }
        console.log("login 111:", formData);
        this.managerService.login(formData.username, formData.password)
            .subscribe((data: any)=>{
                console.log("login 444:", data);
                // Token.setToken(data.token);
                // this.router.navigate(["/award"]);
            });
	}
}
