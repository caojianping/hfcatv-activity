import {Cookie} from "jts-cookie";
import {Constants} from "../common/constants";

export default class TokenHelper {
	static setToken(token: string) {
		return Cookie.setItem<string>(Constants.TOKEN, token, Constants.TWO_HOURS);
	}

	static getToken(): string {
		return Cookie.getItem<string>(Constants.TOKEN) || "";
	}

	static removeToken(): boolean {
		return Cookie.removeItem(Constants.TOKEN);
	}
}
