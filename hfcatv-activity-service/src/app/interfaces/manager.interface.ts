import { BaseDocument } from "./common.interface";
import { RoleType } from "../../common/enums";

export interface ManagerDocument extends BaseDocument {
  _id: any; // 管理员编号
  username: string; // 管理员姓名
  password: string; // 管理员密码
  role: RoleType; // 角色类型
  validatePassword: (password: string) => boolean;
}
