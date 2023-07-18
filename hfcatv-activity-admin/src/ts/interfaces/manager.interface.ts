import {RoleType} from "../common/enums";
import {BaseDocument} from "./common.interface";

export interface ManagerInfo {
    managerId: string;
    username: string;
    role: RoleType;
}

export interface ManagerDocument extends BaseDocument {
    _id: any;           // 管理员编号
    username: string;   // 管理员姓名
    password: string;   // 管理员密码
    role: RoleType;     // 角色类型
}
