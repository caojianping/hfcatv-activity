import {UserDocument, UserModel} from "../models";
import BaseService from "./base.service";

export default class UserService extends BaseService {
    constructor() {
        super(UserModel);
    }

    async getUserById(id: string): Promise<UserDocument> {
        if (!id) return Promise.reject("用户编号不可以为空");

        let user = await this.model.findById(id);
        console.log("UserService.getUserById user:", user);
        return user;
    }

    async getUserByOpenId(openId: string): Promise<UserDocument> {
        if (!openId) return Promise.reject("微信编号不可以为空");

        let user = await this.model.findOne({openId: openId});
        console.log("UserService.getUserByOpenId user:", user);
        return user;
    }

    async addUser(openId: string, nickname: string): Promise<UserDocument> {
        if (!openId) return Promise.reject("微信编号不可以为空");
        if (!nickname) return Promise.reject("昵称不可以为空");

        let result = await this.isExist({openId: openId});
        if (result.status) return Promise.reject("该用户已经存在");
        else {
            let user = await this.model.create({openId: openId, nickname: nickname, lottoCount: 3});
            console.log("UserService.addUser user:", user);
            return user;
        }
    }

    async updateUser(conditions: any, update: any): Promise<UserDocument> {
        if (!conditions) return Promise.reject("查询条件不可以为空");
        if (!update) return Promise.reject("更新数据不可以为空");

        conditions["isDelete"] = false;
        update["updateTime"] = new Date();
        let user = await this.model.findOneAndUpdate(conditions, {$set: update}, {new: true});
        console.log("UserService.updateUser user:", user);
        return user;
    }

    async getLottoCount(id: string): Promise<number> {
        if (!id) return Promise.reject("用户编号不可以为空");

        let user = await this.model.findById(id);
        if (!user) return Promise.reject("该用户不存在");
        return user.lottoCount;
    }

    async setLottoCount(openId: string, lottoCount: number): Promise<UserDocument> {
        if (!openId) return Promise.reject("微信编号不可以为空");
        if (lottoCount <= 0) return Promise.reject("无效的抽奖次数");

        let user = await this.model.findOneAndUpdate({openId: openId},
            {$set: {lottoCount: lottoCount, updateTime: new Date()}},
            {new: true});
        console.log("UserService.setLottoCount user:", user);
        return user;
    }

    async reduceLottoCount(id: string): Promise<UserDocument> {
        if (!id) return Promise.reject("用户编号不可以为空");

        let user = await this.model.findByIdAndUpdate(id,
            {
                $inc: {lottoCount: -1},
                $set: {updateTime: new Date()}
            },
            {new: true});
        console.log("UserService.reduceLottoCount user:", user);
        return user;
    }
};
