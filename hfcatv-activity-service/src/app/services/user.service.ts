import {BusinessError, ErrorType} from "../../error/index";
import {Constants} from "../../common/constants";
import {UserDocument} from "../interfaces/index";
import {UserModel} from "../models/index";
import BaseService from "./base.service";

export default class UserService extends BaseService {
    constructor() {
        super(UserModel);
    }

    async getUserById(id: string): Promise<UserDocument | null> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[用户编号]`));
        return await this.model.findOne({_id: id, isDelete: false});
    }

    async getUserByWechat(unionId: string, openId: string, nickname: string): Promise<UserDocument | null> {
        if (!unionId) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[微信unionId]`));
        if (!openId) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[微信openId]`));
        if (!nickname) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[微信昵称]`));

        let result = await this.isExist({unionId: unionId, openId: openId, isDelete: false});
        if (result.status) {
            let user = result.data;
            if (user.nickname !== nickname) {
                let update = {nickname: nickname, updateTime: new Date()};
                return await this.model.findByIdAndUpdate(user._id, {$set: update}, {new: true});
            }
            return user;
        } else {
            return await this.model.create({
                unionId: unionId,
                openId: openId,
                nickname: nickname,
                lottoCount: Constants.DEFAULT_LOTTO_COUNT,
                createTime: new Date(),
                isDelete: false
            });
        }
    }

    async getUserIdByWechat(unionId: string, openId: string): Promise<string> {
        if (!unionId) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[微信unionId]`));
        if (!openId) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[微信openId]`));

        let result = await this.isExist({unionId: unionId, openId: openId, isDelete: false});
        if (!result.status) return Promise.reject(new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[用户]`));
        return result.data._id;
    }

    async getUserIdsByNickname(nickname: string): Promise<Array<string>> {
        if (!nickname) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[昵称]`));

        let users = await this.model.find({nickname: {$regex: nickname}, isDelete: false});
        return users.map((user: UserDocument) => user._id);
    }

    async getLottoCount(id: string): Promise<number> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[用户编号]`));

        let user = await this.model.findById(id);
        if (!user) return Promise.reject(new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[用户]`));
        return user.lottoCount;
    }

    async setLottoCount(id: string, delta: number): Promise<UserDocument | null> {
        if (!id) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[用户编号]`));
        return await this.model.findByIdAndUpdate(id,
            {
                $inc: {lottoCount: delta},
                $set: {updateTime: new Date()}
            },
            {new: true});
    }
};
