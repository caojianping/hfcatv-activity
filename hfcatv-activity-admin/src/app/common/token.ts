import {LocalStorage} from "jts-storage";
import {Constants} from "./constants";

export default class Token {
    static setToken(token: string) {
        return LocalStorage.setItem<string>(Constants.TOKEN, token, Constants.TWO_HOURS);
    }

    static getToken(): string {
        return LocalStorage.getItem<string>(Constants.TOKEN) || "";
    }

    static removeToken(): boolean{
        return LocalStorage.removeItem<string>(Constants.TOKEN);
    }
}
