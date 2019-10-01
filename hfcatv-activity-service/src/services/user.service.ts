import {BusinessError, ErrorType} from "../error";
import {Constants} from "../common/constants";
import {UserDocument} from "../interfaces";
import {UserModel} from "../models";
import BaseService from "./base.service";

export default class UserService extends BaseService {
    constructor() {
        super(UserModel);
    }

    async getUserByOpenId(openId: string): Promise<UserDocument | null> {
        if (!openId) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[微信编号]`));
        return await this.model.findOne({openId: openId});
    }

    async getUserByConditions(openId: string, nickname: string): Promise<UserDocument | null> {
        if (!openId) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[微信编号]`));
        if (!nickname) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[昵称]`));

        let result = await this.isExist({openId: openId});
        if (result.status) return result.data;
        return await this.model.create({openId: openId, nickname: nickname, lottoCount: Constants.DEFAULT_LOTTO_COUNT});
    }

    async getUserIdByOpenId(openId: string): Promise<string> {
        if (!openId) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[微信编号]`));

        let user = await this.model.findOne({openId: openId});
        if (!user) return Promise.reject(new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[用户]`));
        return user._id;
    }

    async addUser(openId: string, nickname: string): Promise<UserDocument | null> {
        if (!openId) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[微信编号]`));
        if (!nickname) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[昵称]`));

        let result = await this.isExist({openId: openId});
        if (result.status) return Promise.reject(new BusinessError(ErrorType.DataExist.code, `${ErrorType.DataExist.message}:[用户]`));
        return await this.model.create({openId: openId, nickname: nickname, lottoCount: Constants.DEFAULT_LOTTO_COUNT});
    }

    async updateUser(conditions: any, update: any): Promise<UserDocument> {
        if (!conditions) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[查询条件]`));
        if (!update) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[更新数据]`));

        conditions["isDelete"] = false;
        update["updateTime"] = new Date();
        return await this.model.findOneAndUpdate(conditions, {$set: update}, {new: true});
    }


    async getLottoCount(id: string): Promise<number> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[用户编号]`));

        let user = await this.model.findById(id);
        if (!user) return Promise.reject(new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[用户信息]`));
        return user.lottoCount;
    }

    async setLottoCount(id: string, delta: number): Promise<UserDocument> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[用户编号]`));
        return await this.model.findByIdAndUpdate(id,
            {
                $inc: {lottoCount: delta},
                $set: {updateTime: new Date()}
            },
            {new: true});
    }
};
