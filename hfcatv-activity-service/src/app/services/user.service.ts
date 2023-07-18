import { BusinessError, ErrorType } from "../../error";
import { Constants } from "../../common/constants";
import { UserModel } from "../models";
import { UserDocument } from "../interfaces";
import BaseService from "./base.service";

export default class UserService extends BaseService {
  constructor() {
    super(UserModel);
  }

  // 根据编号获取用户
  async getUserById(id: string): Promise<UserDocument | null> {
    if (!id)
      return Promise.reject(
        new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[用户编号]`)
      );
    return await this.model.findOne({ _id: id, isDelete: false });
  }

  // 根据微信信息获取用户
  // async getUserByWechat(unionId: string, openId: string, nickname: string): Promise<UserDocument | null> {
  async getUserByWechat(openId: string, nickname: string): Promise<UserDocument | null> {
    // if (!unionId) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[微信unionId]`));
    if (!openId)
      return Promise.reject(
        new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[微信openId]`)
      );
    if (!nickname)
      return Promise.reject(
        new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[微信昵称]`)
      );

    // let result = await this.isExist({unionId: unionId, openId: openId, isDelete: false});
    let result = await this.isExist({ openId: openId, isDelete: false });
    if (result.status) {
      let user = result.data;
      if (user.nickname !== nickname) {
        let update = { nickname: nickname, updateTime: new Date() };
        return await this.model.findByIdAndUpdate(user._id, { $set: update }, { new: true });
      }
      return user;
    } else {
      return await this.model.create({
        openId: openId,
        nickname: nickname,
        lottoCount: Constants.DEFAULT_LOTTO_COUNT,
        createTime: new Date(),
        isDelete: false,
      });
    }
  }

  // 根据微信信息获取用户编号
  // async getUserIdByWechat(unionId: string, openId: string): Promise<string> {
  async getUserIdByWechat(openId: string): Promise<string> {
    // if (!unionId) return Promise.reject(new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[微信unionId]`));
    if (!openId)
      return Promise.reject(
        new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[微信openId]`)
      );

    // let result = await this.isExist({unionId: unionId, openId: openId, isDelete: false});
    let result = await this.isExist({ openId: openId, isDelete: false });
    if (!result.status)
      return Promise.reject(
        new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[用户]`)
      );
    return result.data._id;
  }

  // 根据指定条件获取用户编号列表
  async getUserIdsByConditions(nickname?: string, openId?: string): Promise<Array<string>> {
    if (!nickname && !openId) return [];

    let conditions = { isDelete: false };
    if (nickname) {
      conditions["nickname"] = { $regex: nickname };
    }
    if (openId) {
      conditions["openId"] = { $regex: openId };
    }
    let users = await this.model.find(conditions);
    return users.map((user: UserDocument) => user._id);
  }

  // 获取抽奖次数
  async getLottoCount(id: string): Promise<number> {
    if (!id)
      return Promise.reject(
        new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[用户编号]`)
      );

    let user = await this.model.findById(id);
    if (!user)
      return Promise.reject(
        new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[用户]`)
      );
    return user.lottoCount;
  }

  // 设置抽奖次数
  async setLottoCount(id: string, lottoCount: number, isDelta: boolean = true): Promise<UserDocument | null> {
    if (!id)
      return Promise.reject(
        new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[用户编号]`)
      );

    let update = isDelta
      ? {
          $inc: { lottoCount: lottoCount },
          $set: { updateTime: new Date() },
        }
      : {
          $set: {
            lottoCount: lottoCount,
            updateTime: new Date(),
          },
        };
    return await this.model.findByIdAndUpdate(id, update, { new: true });
  }
}
