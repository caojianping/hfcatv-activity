import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
	validateForm: FormGroup;

	constructor(private fb: FormBuilder) {
	}

	ngOnInit(): void {
		this.validateForm = this.fb.group({
			username: [null, [Validators.required]],
			password: [null, [Validators.required]],
			remember: [true]
		});
	}

	submitForm(): void {
		for (const i in this.validateForm.controls) {
			this.validateForm.controls[i].markAsDirty();
			this.validateForm.controls[i].updateValueAndValidity();
		}
	}
}
