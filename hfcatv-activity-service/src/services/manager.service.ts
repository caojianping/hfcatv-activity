import {ManagerDocument, ManagerModel} from "../models";
import BaseService from "./base.service";

export default class ManagerService extends BaseService {
    constructor() {
        super(ManagerModel);
    }

    async getManager(username: string): Promise<ManagerDocument> {
        if (!username) return Promise.reject("管理员姓名不可以为空");

        let manager = await this.model.findOne({username: username});
        console.log("ManagerService.getManager manager:", manager);
        return manager;
    }

    async addManager(username: string, password: string): Promise<ManagerDocument> {
        if (!username) return Promise.reject("管理员名称不可以为空");
        if (!password) return Promise.reject("管理员密码不可以为空");

        let result = await this.isExist({username: username});
        if (result.status) return Promise.reject("该管理员已经存在");
        else {
            let manager = await this.model.create({username: username, password: password});
            console.log("ManagerService.addManager manager:", manager);
            return manager;
        }
    }

    async setPassword(conditions: any, password: string): Promise<ManagerDocument> {
        if (!conditions) return Promise.reject("查询条件不可以为空");
        if (!password) return Promise.reject("管理员密码不可以为空");

        let result = await this.isExist(conditions);
        if (!result.status) return Promise.reject("暂无该管理员信息");

        let data: ManagerDocument = result.data;
        data["password"] = password;
        data["updateTime"] = new Date();
        let manager = await data.save();
        console.log("ManagerService.setPassword manager:", manager);
        return manager;
    }
};
