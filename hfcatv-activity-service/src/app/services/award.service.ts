/***
 * @file: 
 * @author: caojianping
 * @Date: 2021-03-19 14:58:36
 */
import { BusinessError, ErrorType } from "../../error";
import { AwardType } from "../../common/enums";
import { AwardTypeKeys } from "../../common/keys";
import { AwardModel } from "../models";
import { AwardDocument } from "../interfaces";
import BaseService from "./base.service";

export default class AwardService extends BaseService {
  constructor() {
    super(AwardModel);
  }

  // 获取参与奖奖品编号
  async getAwardIdByNothing(): Promise<string | undefined> {
    let awards: any = await this.model.find({ type: AwardType.Nothing, isDelete: false }),
      award: any = (awards || [])[0] || {};
    return award._id;
  }

  // 获取奖品列表
  async getAwards(): Promise<Array<AwardDocument>> {
    return await this.model.find({ isDelete: false });
  }

  // 根据类型获取奖品编号列表
  async getAwardIdsByType(type: number): Promise<Array<string>> {
    let awards = await this.model.find({ type: type, isDelete: false });
    return awards.map((award: AwardDocument) => award._id);
  }

  // 添加奖品
  async addAward(award: any): Promise<AwardDocument | null> {
    if (!award)
      return Promise.reject(
        new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[奖品]`)
      );

    const { name, type, ranges } = award;
    if (!name)
      return Promise.reject(
        new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[奖品名称]`)
      );
    if (AwardTypeKeys.indexOf(type) < 0)
      return Promise.reject(
        new BusinessError(ErrorType.InvalidType.code, `${ErrorType.InvalidType.message}:[奖品类型]`)
      );

    if (type === AwardType.RedPacket && (!ranges || ranges.length !== 2)) {
      return Promise.reject(
        new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[红包额度范围]`)
      );
    }

    let result = await this.isExist({ name: name, type: type, isDelete: false });
    if (result.status)
      return Promise.reject(new BusinessError(ErrorType.DataExist.code, `${ErrorType.DataExist.message}:[奖品]`));
    else {
      award["createTime"] = new Date();
      award["isDelete"] = false;
      return await this.model.create(award);
    }
  }

  // 更新奖品
  async updateAward(id: string, update: any): Promise<AwardDocument | null> {
    if (!id)
      return Promise.reject(
        new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[奖品编号]`)
      );
    if (!update)
      return Promise.reject(
        new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[奖品更新数据]`)
      );

    update["updateTime"] = new Date();
    return await this.model.findByIdAndUpdate(id, { $set: update }, { new: true });
  }
}
