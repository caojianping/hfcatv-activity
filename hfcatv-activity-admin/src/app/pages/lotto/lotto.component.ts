import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {ActivityStatuses, AwardRanks, AwardTypes, RedPacketStatusMap, GoodsStatusMap} from "../../../ts/common/names";
import {LottoDocument, PaginateResult} from "../../../ts/interfaces";
import {LottoService} from "../../../ts/services";
import {FormBuilder} from "@angular/forms";

@Component({
	selector: 'app-lotto',
	templateUrl: './lotto.component.html',
	styleUrls: ['./lotto.component.less']
})
export class LottoComponent implements OnInit {
	AwardTypes: Array<string> = AwardTypes;
	AwardRanks: Array<string> = AwardRanks;
	ActivityStatuses: Array<string> = ActivityStatuses;
	RedPacketStatusMap: any = RedPacketStatusMap;
	GoodsStatusMap: any = GoodsStatusMap;

	queryForm: any;

	isLoading: boolean = false;
	lottoPageResult: PaginateResult<LottoDocument> = {
		docs: [],
		total: 0,
		limit: 10,
		page: 1
	};

	constructor(
		private message: NzMessageService,
		private modal: NzModalService,
		private lottoService: LottoService,
		private formBuilder: FormBuilder
	) {
		this.queryForm = this.formBuilder.group({
			username: [""],
			title: [""],
			type: [""],
			status: [""]
		});
	}

	ngOnInit() {
		this.fetchPageLottos();
	}

	fetchPageLottos(key?: string, $event?: number) {
		const self = this;
		if (key && $event) {
			self.lottoPageResult[key] = $event;
		}

		const {message, lottoService, queryForm, lottoPageResult} = self;
		self.isLoading = true;
		lottoService.getPageLottos(queryForm.value || {}, lottoPageResult.page, lottoPageResult.limit)
			.subscribe({
				next(result: PaginateResult<LottoDocument>) {
					console.log("getPageLottos result:", result);
					self.isLoading = false;
					self.lottoPageResult = result;
				},
				error(err: any) {
					console.log("getPageLottos err:", err);
					self.isLoading = false;
					message.error(err);
				}
			})
	}

	queryLottos() {
		if (!this.queryForm.valid) {
			for (const i in this.queryForm.controls) {
				this.queryForm.controls[i].markAsDirty();
				this.queryForm.controls[i].updateValueAndValidity();
			}
			return;
		}

		this.fetchPageLottos();
	}

	setStatus(id: string, status: number) {
		const self = this;
		const {message, lottoService, lottoPageResult} = self;
		lottoService.setStatus(id, status)
			.subscribe({
				next(data: LottoDocument) {
					let attachInfo: any = data.attachInfo || {},
						lottos = lottoPageResult.docs;
					lottos.forEach((lotto: LottoDocument) => {
						if (lotto._id === data._id) {
							lotto.attachInfo["status"] = attachInfo.status;
						}
					});
					self.lottoPageResult["docs"] = lottos;
				},
				error(err: any) {
					message.error(err);
				}
			});
	}
}
