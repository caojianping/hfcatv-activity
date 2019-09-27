import config from "config";
import jwt from "jsonwebtoken";
import done from "../common/done";

const secret = config.get<string>("jwt.secret");

function verifyPromise(token: string): Promise<any> {
	return new Promise((resolve, reject) => {
		return jwt.verify(token, secret, done(resolve, reject));
	});
}

export class ManagerToken {
	managerId: string;
	username: string;

	constructor(managerId: string, username: string) {
		this.managerId = managerId;
		this.username = username;
	}
}

export class TokenHelper {
	static createToken(data: any): any {
		const exp = Math.floor(Date.now() / 1000) + 7200;
		return jwt.sign({data: data, exp: exp}, secret);
	}
	
	static async checkToken(token: string): Promise<ManagerToken | boolean> {
		if (!token) return false;

		let parts = token.split(' ');
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
}