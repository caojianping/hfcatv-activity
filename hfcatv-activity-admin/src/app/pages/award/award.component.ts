import {Component, OnInit} from "@angular/core";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {FormBuilder} from "@angular/forms";
import {AwardTypes} from "../../../ts/common/names";
import {AwardDocument, PaginateResult} from "../../../ts/interfaces";
import {AwardService} from "../../../ts/services";

@Component({
	selector: "app-award",
	templateUrl: "./award.component.html",
	styleUrls: ["./award.component.less"]
})
export class AwardComponent implements OnInit {
	AwardTypes: Array<string> = AwardTypes;

	queryForm: any;

	isLoading: boolean = false;
	awardPageResult: PaginateResult<AwardDocument> = {
		docs: [],
		total: 0,
		limit: 10,
		page: 1
	};

	isVisible: boolean = false;
	currentAward?: AwardDocument;

	constructor(
		private message: NzMessageService,
		private modal: NzModalService,
		private awardService: AwardService,
		private formBuilder: FormBuilder
	) {
		this.queryForm = this.formBuilder.group({
			name: [""]
		});
	}

	ngOnInit() {
		this.fetchPageAwards();
	}

	fetchPageAwards(key?: string, $event?: number) {
		const self = this;
		if (key && $event) {
			self.awardPageResult[key] = $event;
		}

		const {message, awardService, queryForm, awardPageResult} = self;
		self.isLoading = true;
		awardService.getPageAwards(queryForm.value || {}, awardPageResult.page, awardPageResult.limit)
			.subscribe({
				next(result: PaginateResult<AwardDocument>) {
					console.log("getPageAwards result:", result);
					self.isLoading = false;
					self.awardPageResult = result;
				},
				error(err: any) {
					console.log("getPageAwards err:", err);
					self.isLoading = false;
					message.error(err);
				}
			})
	}

	queryAwards(){
		if (!this.queryForm.valid) {
			for (const i in this.queryForm.controls) {
				this.queryForm.controls[i].markAsDirty();
				this.queryForm.controls[i].updateValueAndValidity();
			}
			return;
		}

		this.fetchPageAwards();
	}

	addAward(){
		this.currentAward = undefined;
		this.isVisible = true;
	}

	editAward(award: AwardDocument) {
		this.currentAward = award;
		this.isVisible = true;
	}

	removeAward(id: string) {
		const self = this;
		const {message, modal, awardService} = self;
		modal.confirm({
			nzTitle: "确定要删除此奖品吗？",
			nzOnOk() {
				awardService.removeAward(id)
					.subscribe({
						next(result: boolean) {
							if (!result) message.error("删除失败");
							self.fetchPageAwards();
						},
						error(err: any) {
							message.error(err);
						}
					});
			}
		});
	}

	handleModalCancel() {
		this.isVisible = false;
	}

	handleModalOk(award: AwardDocument) {
		const self = this;
		const {message, awardService, awardPageResult} = self;
		awardService.updateAward(<AwardDocument>{
			_id: award._id,
			name: award.name,
			type: award.type
		})
			.subscribe({
				next(data: AwardDocument) {
					let awards = awardPageResult.docs;
					awards.forEach((award: AwardDocument) => {
						if (award._id === data._id) {
							for (let key in data) {
								let value = data[key];
								if (key !== "_id") {
									award[key] = value;
								}
							}
						}
					});
					self.awardPageResult["docs"] = awards;
					self.isVisible = false;
				},
				error(err: any) {
					message.error(err);
					self.isVisible = false;
				}
			});
	}
}
