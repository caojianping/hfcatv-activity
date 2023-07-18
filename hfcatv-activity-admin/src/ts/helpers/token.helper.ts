import {LocalStorage} from "jts-storage";
import {Base64} from "js-base64";
import {Constants} from "../common/constants";
import {ManagerInfo} from "../interfaces";

export default class TokenHelper {
    static setToken(token: string) {
        return LocalStorage.setItem<string>(Constants.TOKEN, token, Constants.TOKEN_EXPIRE_TIME);
    }

    static getToken(): string {
        return LocalStorage.getItem<string>(Constants.TOKEN) || "";
    }

    static removeToken(): boolean {
        return LocalStorage.removeItem(Constants.TOKEN);
    }

    static getManagerInfo(): ManagerInfo | null {
        let token = LocalStorage.getItem<string>(Constants.TOKEN) || "";
        if (!token) return null;

        let parts = token.split(".");
        if (parts.length !== 3) return null;

        try {
            let payload = JSON.parse(Base64.decode(parts[1])) || {};
            return payload.data || null;
        } catch (err) {
            return null;
        }
    }
}
