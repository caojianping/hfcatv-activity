import {BaseDocument} from "./common.interface";

export interface ManagerDocument extends BaseDocument {
	_id: any;           // 管理员编号
	username: string;   // 管理员姓名
	password: string;   // 管理员密码
	validatePassword: (password: string) => boolean;
}
