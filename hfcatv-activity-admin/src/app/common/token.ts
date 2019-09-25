import {LocalStorage} from "jts-storage";
import {Constants} from "./constants";

export default class Token {
    static setToken(token: string) {
        return LocalStorage.setItem<string>(Constants.TOKEN, token);
    }

    static getToken(): string {
        return LocalStorage.getItem<string>(Constants.TOKEN) || "";
    }
}
