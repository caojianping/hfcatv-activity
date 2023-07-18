import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl} from "@angular/forms";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {Utils} from "../../../ts/common/utils";
import {
    ActivityStatuses, AwardRanks, AwardTypes,
    CardStatusMap, RedPacketStatusMap, GoodsStatusMap, MovieTicketStatusMap
} from "../../../ts/common/names";
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

    CardStatusMap: any = CardStatusMap;
    RedPacketStatusMap: any = RedPacketStatusMap;
    GoodsStatusMap: any = GoodsStatusMap;
    MovieTicketStatusMap: any = MovieTicketStatusMap;

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
            openId: new FormControl(null),
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

        let {type, status} = queryForm.value;
        if (type !== undefined && type !== null) {
            queryForm.value["type"] = Number(type);
        }
        if (status !== undefined && status !== null) {
            queryForm.value["status"] = Number(status);
        }

        lottoService.getPageLottos(Utils.filterConditions(queryForm.value, false), lottoPageResult.page, lottoPageResult.limit)
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
        const {modal, message, lottoService} = self;
        modal.confirm({
            nzTitle: status === -1 ? "确定要驳回此中奖记录吗？" : "确定要发放此奖品吗？",
            nzOnOk() {
                lottoService.setStatus(id, status)
                .subscribe({
                    next(data: LottoDocument<any, AwardVO>) {
                        self.fetchPageLottos();
                    },
                    error(err: any) {
                        message.error(err);
                    }
                });
            }
        });
    }

    sendRedPacket(id: string) {
        const self = this;
        const {modal, message, lottoService} = self;
        modal.confirm({
            nzTitle: "确定要发放此现金奖品吗？",
            nzOnOk() {
                lottoService.sendRedPacket(id)
                .subscribe({
                    next(result: boolean) {
                        result && self.fetchPageLottos();
                    },
                    error(err: any) {
                        message.error(err);
                    }
                });
            }
        });
    }
}
