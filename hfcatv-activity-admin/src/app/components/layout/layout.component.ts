import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";
import {TokenHelper} from "../../../ts/helpers";
import {ManagerService} from "../../../ts/services";

@Component({
    selector: "app-layout",
    templateUrl: "./layout.component.html",
    styleUrls: ["./layout.component.less"]
})
export class LayoutComponent implements OnInit {
    username: string = "";
    isCollapsed: boolean = false;

    constructor(
        private router: Router,
        private message: NzMessageService,
        private managerService: ManagerService
    ) {
        let managerInfo = TokenHelper.getManagerInfo();
        console.log("managerInfo:", managerInfo);
        if (managerInfo) {
            this.username = managerInfo.username;
        }
    }

    logout() {
        console.log("logout");
        const {router, message, managerService} = this;
        managerService.logout()
            .subscribe({
                next(data: boolean) {
                    if (data) {
                        TokenHelper.removeToken();
                        router.navigateByUrl("/login");
                    }
                    else message.error("注销失败");
                },
                error(err: any) {
                    message.error(err);
                }
            });
    }

    ngOnInit() {
    }
}
