import {environment} from "../../environments/environment";

const apiUrl = environment.apiUrl;
console.log("environment.apiUrl:", apiUrl);

export const Urls = {
	account: {
		login: `${apiUrl}/admin/account/login`,
		setPassword: `${apiUrl}/admin/account/setPassword`,
		status: `${apiUrl}/admin/account/status`
	},
	award: {
		list: `${apiUrl}/admin/award/list`,
		add: `${apiUrl}/admin/award/add`,
		update: `${apiUrl}/admin/award/update`,
		remove: `${apiUrl}/admin/award/remove`
	},
	activity: {
		list: `${apiUrl}/admin/activity/list`,
		add: `${apiUrl}/admin/activity/add`,
		update: `${apiUrl}/admin/activity/update`,
		remove: `${apiUrl}/admin/activity/remove`
	},
	lotto: {
		list: `${apiUrl}/admin/lotto/list`,
		setStatus: `${apiUrl}/admin/lotto/setStatus`
	}
};