import { BusinessError, ErrorType } from "../../error";
import { RoleTypeKeys } from "../../common/keys";
import { ManagerModel } from "../models";
import { AwardDocument, ManagerDocument } from "../interfaces";
import BaseService from "./base.service";
import { Constants } from "../../common/constants";

export default class ManagerService extends BaseService {
  constructor() {
    super(ManagerModel);
  }

  // 获取管理员
  async getManager(id: string): Promise<ManagerDocument | null> {
    if (!id)
      return Promise.reject(
        new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[管理员编号]`)
      );
    return await this.model.findOne({ _id: id, isDelete: false });
  }

  // 添加管理员
  async addManager(manager: any): Promise<ManagerDocument | null> {
    if (!manager)
      return Promise.reject(
        new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[管理员]`)
      );

    const { username, password, role } = manager;
    if (!username)
      return Promise.reject(
        new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[管理员姓名]`)
      );
    if (!password)
      return Promise.reject(
        new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[管理员密码]`)
      );
    if (RoleTypeKeys.indexOf(role) < 0)
      return Promise.reject(
        new BusinessError(ErrorType.InvalidType.code, `${ErrorType.InvalidType.message}:[角色类型]`)
      );

    let result = await this.isExist({ username: username, isDelete: false });
    if (result.status)
      return Promise.reject(new BusinessError(ErrorType.DataExist.code, `${ErrorType.DataExist.message}:[管理员]`));
    else {
      manager["createTime"] = new Date();
      manager["isDelete"] = false;
      return await this.model.create(manager);
    }
  }

  // 更新管理员
  async updateManager(id: string, update: any): Promise<AwardDocument | null> {
    if (!id)
      return Promise.reject(
        new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[管理员编号]`)
      );
    if (!update)
      return Promise.reject(
        new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[管理员更新数据]`)
      );

    update["updateTime"] = new Date();
    return await this.model.findByIdAndUpdate(id, { $set: update }, { new: true });
  }

  // 设置密码
  async setPassword(conditions: any, password: string): Promise<boolean> {
    if (!conditions)
      return Promise.reject(
        new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[查询条件]`)
      );
    if (!password)
      return Promise.reject(
        new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[管理员密码]`)
      );

    let result = await this.isExist(conditions);
    if (!result.status)
      return Promise.reject(
        new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[管理员]`)
      );

    let manager: ManagerDocument = result.data;
    manager["password"] = password;
    manager["updateTime"] = new Date();
    await manager.save();
    return true;
  }

  // 重置密码
  async resetPassword(id: string): Promise<boolean> {
    if (!id)
      return Promise.reject(
        new BusinessError(ErrorType.ParameterRequired.code, `${ErrorType.ParameterRequired.message}:[管理员编号]`)
      );

    let result = await this.isExist({ _id: id });
    if (!result.status)
      return Promise.reject(
        new BusinessError(ErrorType.DataInexistence.code, `${ErrorType.DataInexistence.message}:[管理员]`)
      );

    let manager: ManagerDocument = result.data;
    manager["password"] = manager.username + Constants.PASSWORD_SUFFIX;
    manager["updateTime"] = new Date();
    await manager.save();
    return true;
  }
}
