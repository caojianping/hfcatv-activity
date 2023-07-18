import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl} from "@angular/forms";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {Utils} from "../../../ts/common/utils";
import {OperateType} from "../../../ts/common/enums";
import {AwardTypes, OperateTypes} from "../../../ts/common/names";
import {AwardDocument, PaginateResult} from "../../../ts/interfaces";
import {AwardService} from "../../../ts/services";

@Component({
    selector: "app-award",
    templateUrl: "./award.component.html",
    styleUrls: ["./award.component.less"]
})
export class AwardComponent implements OnInit {
    Utils: any = Utils;

    AwardTypes: Array<string> = AwardTypes;
    OperateTypes: Array<string> = OperateTypes;

    queryForm: any;

    isLoading: boolean = false;
    awardPageResult: PaginateResult<AwardDocument> = {
        docs: [],
        total: 0,
        page: 1,
        limit: 10
    };

    type: OperateType = OperateType.Add;
    isVisible: boolean = false;
    currentAward?: AwardDocument;

    constructor(
        private formBuilder: FormBuilder,
        private modal: NzModalService,
        private message: NzMessageService,
        private awardService: AwardService
    ) {
        this.queryForm = this.formBuilder.group({
            name: new FormControl(null)
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
        awardService.getPageAwards(Utils.filterConditions(queryForm.value), awardPageResult.page, awardPageResult.limit)
        .subscribe({
            next(result: PaginateResult<AwardDocument>) {
                self.isLoading = false;
                self.awardPageResult = result;
            },
            error(err: any) {
                self.isLoading = false;
                message.error(err);
            }
        });
    }

    queryAwards() {
        if (!this.queryForm.valid) {
            for (const i in this.queryForm.controls) {
                this.queryForm.controls[i].markAsDirty();
                this.queryForm.controls[i].updateValueAndValidity();
            }
            return;
        }

        this.fetchPageAwards();
    }

    addAward() {
        this.type = OperateType.Add;
        this.currentAward = undefined;
        this.isVisible = true;
    }

    editAward(award: AwardDocument) {
        this.type = OperateType.Edit;
        this.currentAward = award;
        this.isVisible = true;
    }

    removeAward(id: string) {
        const self = this;
        const {modal, message, awardService} = self;
        modal.confirm({
            nzTitle: "确定要删除此奖品吗？",
            nzOnOk() {
                awardService.removeAward(id)
                .subscribe({
                    next(result: boolean) {
                        if (!result) message.error("删除失败");
                        else self.fetchPageAwards();
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
        const {message, awardService, type} = self;
        if (type === OperateType.Add) {
            awardService.addAward(award)
            .subscribe({
                next() {
                    self.fetchPageAwards();
                    self.isVisible = false;
                },
                error(err: any) {
                    message.error(err);
                    self.isVisible = false;
                }
            });
        } else if (type === OperateType.Edit) {
            awardService.updateAward(award)
            .subscribe({
                next(data: AwardDocument) {
                    self.fetchPageAwards();
                    self.isVisible = false;
                },
                error(err: any) {
                    message.error(err);
                    self.isVisible = false;
                }
            });
        }
    }
}
