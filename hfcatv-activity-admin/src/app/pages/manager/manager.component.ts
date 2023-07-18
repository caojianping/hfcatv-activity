import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl} from "@angular/forms";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {Utils} from "../../../ts/common/utils";
import {OperateType} from "../../../ts/common/enums";
import {RoleTypes, OperateTypes} from "../../../ts/common/names";
import {ManagerDocument, PaginateResult} from "../../../ts/interfaces";
import {ManagerService} from "../../../ts/services";

@Component({
    selector: "app-manager",
    templateUrl: "./manager.component.html",
    styleUrls: ["./manager.component.less"]
})
export class ManagerComponent implements OnInit {
    Utils: any = Utils;

    RoleTypes: Array<string> = RoleTypes;
    OperateTypes: Array<string> = OperateTypes;

    queryForm: any;

    isLoading: boolean = false;
    managerPageResult: PaginateResult<ManagerDocument> = {
        docs: [],
        total: 0,
        page: 1,
        limit: 10
    };

    type: OperateType = OperateType.Add;
    isVisible: boolean = false;
    currentManager?: ManagerDocument;

    constructor(
        private formBuilder: FormBuilder,
        private modal: NzModalService,
        private message: NzMessageService,
        private managerService: ManagerService
    ) {
        this.queryForm = this.formBuilder.group({
            username: new FormControl(null)
        });
    }

    ngOnInit() {
        this.fetchPageManagers();
    }

    fetchPageManagers(key?: string, $event?: number) {
        const self = this;
        if (key && $event) {
            self.managerPageResult[key] = $event;
        }

        const {message, managerService, queryForm, managerPageResult} = self;
        self.isLoading = true;
        managerService.getPageManagers(Utils.filterConditions(queryForm.value), managerPageResult.page, managerPageResult.limit)
        .subscribe({
            next(result: PaginateResult<ManagerDocument>) {
                self.isLoading = false;
                self.managerPageResult = result;
            },
            error(err: any) {
                self.isLoading = false;
                message.error(err);
            }
        });
    }

    queryManagers() {
        if (!this.queryForm.valid) {
            for (const i in this.queryForm.controls) {
                this.queryForm.controls[i].markAsDirty();
                this.queryForm.controls[i].updateValueAndValidity();
            }
            return;
        }

        this.fetchPageManagers();
    }

    addManager() {
        this.type = OperateType.Add;
        this.currentManager = undefined;
        this.isVisible = true;
    }

    editManager(award: ManagerDocument) {
        this.type = OperateType.Edit;
        this.currentManager = award;
        this.isVisible = true;
    }

    removeManager(id: string) {
        const self = this;
        const {modal, message, managerService} = self;
        modal.confirm({
            nzTitle: "确定要删除此管理员吗？",
            nzOnOk() {
                managerService.removeManager(id)
                .subscribe({
                    next(result: boolean) {
                        if (!result) message.error("删除失败");
                        else self.fetchPageManagers();
                    },
                    error(err: any) {
                        message.error(err);
                    }
                });
            }
        });
    }

    resetPassword(id: string) {
        const self = this;
        const {modal, message, managerService} = self;
        modal.confirm({
            nzTitle: "确定要重置此管理员的密码吗？",
            nzOnOk() {
                managerService.resetPassword(id)
                .subscribe({
                    next(result: boolean) {
                        if (!result) message.error("重置失败");
                        else {
                            message.success("重置成功");
                            self.fetchPageManagers();
                        }
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

    handleModalOk(manager: ManagerDocument) {
        const self = this;
        const {message, managerService, type} = self;
        if (type === OperateType.Add) {
            managerService.addManager(manager)
            .subscribe({
                next() {
                    self.fetchPageManagers();
                    self.isVisible = false;
                },
                error(err: any) {
                    message.error(err);
                    self.isVisible = false;
                }
            });
        } else if (type === OperateType.Edit) {
            managerService.updateManager(manager)
            .subscribe({
                next(data: ManagerDocument) {
                    self.fetchPageManagers();
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
