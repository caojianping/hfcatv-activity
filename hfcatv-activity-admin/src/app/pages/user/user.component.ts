import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl} from "@angular/forms";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {Utils} from "../../../ts/common/utils";
import {UserDocument, PaginateResult} from "../../../ts/interfaces";
import {UserService} from "../../../ts/services";

@Component({
    selector: "app-user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.less"]
})
export class UserComponent implements OnInit {
    Utils: any = Utils;

    queryForm: any;

    isLoading: boolean = false;
    userPageResult: PaginateResult<UserDocument> = {
        docs: [],
        total: 0,
        page: 1,
        limit: 10
    };

    isVisible: boolean = false;
    currentUser?: UserDocument;

    constructor(
        private formBuilder: FormBuilder,
        private modal: NzModalService,
        private message: NzMessageService,
        private userService: UserService
    ) {
        this.queryForm = this.formBuilder.group({
            openId: new FormControl(null),
            nickname: new FormControl(null)
        });
    }

    ngOnInit() {
        this.fetchPageUsers();
    }

    fetchPageUsers(key?: string, $event?: number) {
        const self = this;
        if (key && $event) {
            self.userPageResult[key] = $event;
        }

        const {message, userService, queryForm, userPageResult} = self;
        self.isLoading = true;
        userService.getPageUsers(Utils.filterConditions(queryForm.value), userPageResult.page, userPageResult.limit)
        .subscribe({
            next(result: PaginateResult<UserDocument>) {
                self.isLoading = false;
                self.userPageResult = result;
            },
            error(err: any) {
                self.isLoading = false;
                message.error(err);
            }
        });
    }

    queryUsers() {
        if (!this.queryForm.valid) {
            for (const i in this.queryForm.controls) {
                this.queryForm.controls[i].markAsDirty();
                this.queryForm.controls[i].updateValueAndValidity();
            }
            return;
        }

        this.fetchPageUsers();
    }

    editUser(user: UserDocument) {
        this.currentUser = user;
        this.isVisible = true;
    }

    handleModalCancel() {
        this.isVisible = false;
    }

    handleModalOk(data: any) {
        const self = this;
        const {message, userService} = self;
        userService.setLottoCount(data._id, data.lottoCount)
        .subscribe({
            next(data: UserDocument) {
                self.fetchPageUsers();
                self.isVisible = false;
            },
            error(err: any) {
                message.error(err);
                self.isVisible = false;
            }
        });
    }
}
