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
	constructor() {
	}

	ngOnInit(): void {
	}
}