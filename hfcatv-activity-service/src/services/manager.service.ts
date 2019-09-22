import BaseService from "./base.service";
import {ManagerDocument, ManagerModel} from "../models";

export default class ManagerService extends BaseService {
    constructor() {
        super(ManagerModel);
    }

    async getManager(username: string): Promise<ManagerDocument> {
        if (!username) return Promise.reject("管理员名称不可以为空");

        let doc = await this.model.findOne({username: username});
        console.log("ManagerService.getManager doc:", doc);
        return doc;
    }

    async addManager(username: string, password: string): Promise<ManagerDocument> {
        if (!username) return Promise.reject("管理员名称不可以为空");
        if (!password) return Promise.reject("管理员密码不可以为空");

        let result = await this.isExist({username: username});
        if (result.status) return Promise.reject("该管理员已经存在");
        else {
            let doc = await this.model.create({username: username, password: password});
            console.log("ManagerService.addManager doc:", doc);
            return doc;
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
        let doc = await data.save();
        console.log("ManagerService.setPassword doc:", doc);
        return doc;
    }
};
