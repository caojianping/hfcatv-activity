import {BusinessError, ErrorType} from "../../error/index";
import {ManagerDocument} from "../interfaces/index";
import {ManagerModel} from "../models/index";
import BaseService from "./base.service";

export default class ManagerService extends BaseService {
    constructor() {
        super(ManagerModel);
    }

    async getManager(id: string): Promise<ManagerDocument | null> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[管理员编号]`));
        return await this.model.findOne({_id: id, isDelete: false});
    }

    async addManager(username: string, password: string): Promise<ManagerDocument> {
        if (!username) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[管理员姓名]`));
        if (!password) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[管理员密码]`));

        let result = await this.isExist({username: username, isDelete: false});
        if (result.status) return Promise.reject(new BusinessError(ErrorType.DataExist.code, `${ErrorType.DataExist.message}:[管理员]`));
        return await this.model.create({
            username: username,
            password: password,
            createTime: new Date(),
            isDelete: false
        });
    }

    async setPassword(conditions: any, password: string): Promise<boolean> {
        if (!conditions) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[查询条件]`));
        if (!password) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[管理员密码]`));

        let result = await this.isExist(conditions);
        if (!result.status) return Promise.reject(new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[管理员]`));

        let manager: ManagerDocument = result.data;
        manager["password"] = password;
        manager["updateTime"] = new Date();
        await manager.save();
        return true;
    }
};
