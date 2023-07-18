/***
 * @file: 
 * @author: caojianping
 * @Date: 2021-03-19 14:58:36
 */
import config from "config";
import jwt from "jsonwebtoken";
import done from "../common/done";
import { Constants } from "../common/constants";
import { RoleType } from "../common/enums";

const secret = config.get<string>("jwt.secret");

function verifyPromise(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    return jwt.verify(token, secret, done(resolve, reject));
  });
}

export class ManagerToken {
  managerId: string;
  username: string;
  role: RoleType;

  constructor(managerId: string, username: string, role: RoleType) {
    this.managerId = managerId;
    this.username = username;
    this.role = role;
  }
}

export class TokenHelper {
  static createToken(data: any): any {
    const exp = Math.floor(Date.now() / 1000) + Constants.TOKEN_EXPIRE_TIME;
    return jwt.sign({ data: data, exp: exp }, secret);
  }

  static async checkToken(token: string): Promise<ManagerToken | boolean> {
    if (!token) return false;

    let parts = token.split(" ");
    token = parts[1];
    if (!token) return false;

    try {
      let payload = await verifyPromise(token);
      if (!payload) return false;
      return <ManagerToken>payload.data;
    } catch (e) {
      return false;
    }
  }

  static getManagerId(payload: any): string | null {
    if (!payload) return null;
    return (payload.data || {}).managerId;
  }
}
