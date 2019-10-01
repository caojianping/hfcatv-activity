import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl} from "@angular/forms";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {Utils} from "../../../ts/common/utils";
import {ActivityStatuses, AwardRanks, AwardTypes, RedPacketStatusMap, GoodsStatusMap} from "../../../ts/common/names";
import {AwardVO, LottoDocument, PaginateResult} from "../../../ts/interfaces";
import {LottoService} from "../../../ts/services";

@Component({
    selector: "app-lotto",
    templateUrl: "./lotto.component.html",
    styleUrls: ["./lotto.component.less"]
})
export class LottoComponent implements OnInit {
    AwardTypes: Array<string> = AwardTypes;
    AwardRanks: Array<string> = AwardRanks;
    ActivityStatuses: Array<string> = ActivityStatuses;
    RedPacketStatusMap: any = RedPacketStatusMap;
    GoodsStatusMap: any = GoodsStatusMap;

    queryForm: any;

    isLoading: boolean = false;
    lottoPageResult: PaginateResult<LottoDocument<any, AwardVO>> = {
        docs: [],
        total: 0,
        page: 1,
        limit: 10
    };

    constructor(
        private formBuilder: FormBuilder,
        private modal: NzModalService,
        private message: NzMessageService,
        private lottoService: LottoService
    ) {
        this.queryForm = this.formBuilder.group({
            nickname: new FormControl(null),
            title: new FormControl(null),
            type: new FormControl(null),
            status: new FormControl(null)
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
        lottoService.getPageLottos(Utils.filterConditions(queryForm.value), lottoPageResult.page, lottoPageResult.limit)
            .subscribe({
                next(result: PaginateResult<LottoDocument<any, AwardVO>>) {
                    self.isLoading = false;
                    self.lottoPageResult = result;
                },
                error(err: any) {
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
                next(data: LottoDocument<any, AwardVO>) {
                    let attachInfo: any = data.attachInfo || {},
                        lottos = lottoPageResult.docs;
                    lottos.forEach((lotto: LottoDocument<any, AwardVO>) => {
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
