import {BusinessError, ErrorType} from "../error";
import {ManagerDocument, ManagerModel} from "../models";
import BaseService from "./base.service";

export default class ManagerService extends BaseService {
    constructor() {
        super(ManagerModel);
    }

    async getManager(id: string): Promise<ManagerDocument | null> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[管理员编号]`));
        return await this.model.findById(id);
    }

    async getManagerByUsername(username: string): Promise<ManagerDocument | null> {
        if (!username) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[管理员姓名]`));
        return await this.model.findOne({username: username});
    }

    async addManager(username: string, password: string): Promise<ManagerDocument> {
        if (!username) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[管理员姓名]`));
        if (!password) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[管理员密码]`));

        let result = await this.isExist({username: username});
        if (result.status) return Promise.reject(new BusinessError(ErrorType.DataExist.code, `${ErrorType.DataExist.message}:[管理员]`));
        return await this.model.create({username: username, password: password});
    }

    async setPassword(conditions: any, password: string): Promise<ManagerDocument> {
        if (!conditions) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[查询条件]`));
        if (!password) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[管理员密码]`));

        let result = await this.isExist(conditions);
        if (!result.status) return Promise.reject(new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[管理员]`));

        let data: ManagerDocument = result.data;
        data["password"] = password;
        data["updateTime"] = new Date();
        return await data.save();
    }
};
