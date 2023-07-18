import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";
import {TokenHelper} from "../../../ts/helpers";
import {ManagerService} from "../../../ts/services";
import {RoleType} from "../../../ts/common/enums";

@Component({
    selector: "app-layout",
    templateUrl: "./layout.component.html",
    styleUrls: ["./layout.component.less"]
})
export class LayoutComponent implements OnInit {
    username: string = "";
    role: RoleType;
    isCollapsed: boolean = false;
    menus: Array<any> = [];

    constructor(
        private router: Router,
        private message: NzMessageService,
        private managerService: ManagerService
    ) {
    }

    logout() {
        const {router, message, managerService} = this;
        managerService.logout()
        .subscribe({
            next(data: boolean) {
                if (data) {
                    TokenHelper.removeToken();
                    router.navigateByUrl("/login");
                } else message.error("注销失败");
            },
            error(err: any) {
                message.error(err);
            }
        });
    }

    ngOnInit() {
        let managerInfo = TokenHelper.getManagerInfo();
        if (managerInfo) {
            let role = managerInfo.role;
            this.username = managerInfo.username;
            this.role = role;
            this.menus = {
                "0": [
                    {
                        name: "产品管理", route: null, icon: "dashboard",
                        items: [
                            {name: "奖品管理", route: "/award", icon: null},
                            {name: "活动管理", route: "/activity", icon: null},
                            {name: "用户管理", route: "/user", icon: null},
                            {name: "中奖管理", route: "/lotto", icon: null}
                        ]
                    },
                    {
                        name: "系统管理", route: null, icon: "form",
                        items: [
                            {name: "操作员", route: "/manager", icon: null},
                            {name: "修改密码", route: "/password", icon: null}
                        ]
                    }
                ],
                "1": [
                    {
                        name: "产品管理", route: null, icon: "dashboard",
                        items: [
                            {name: "中奖管理", route: "/lotto", icon: null}
                        ]
                    },
                    {
                        name: "系统管理", route: null, icon: "form",
                        items: [
                            {name: "修改密码", route: "/password", icon: null}
                        ]
                    }
                ]
            }[String(role)];
        }
    }
}
