import {Component, OnInit} from "@angular/core";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: [
		"./less/reset.less",
		"./less/common.less",
		"./app.component.less"
	]
})
export class AppComponent implements OnInit {
	isLoginPath: boolean = false;
	isCollapsed: boolean = false;

	constructor() {
		const location = window.location;
		this.isLoginPath = location.pathname.indexOf("/login") > -1;
	}

	ngOnInit(): void {
	}
}