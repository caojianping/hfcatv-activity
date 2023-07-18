import {environment} from "../../environments/environment";

const apiUrl = environment.apiUrl;
window.console && window.console.log("environment.apiUrl:", apiUrl);

export const Urls = {
    account: {
        login: `${apiUrl}/admin/account/login`,
        logout: `${apiUrl}/admin/account/logout`,
        setPassword: `${apiUrl}/admin/account/setPassword`
    },
    token: {
        status: `${apiUrl}/admin/token/status`,
        refresh: `${apiUrl}/admin/token/refresh`
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
        remove: `${apiUrl}/admin/activity/remove`,
        setSwitch: `${apiUrl}/admin/activity/setSwitch`,
        setAward: `${apiUrl}/admin/activity/setAward`,
        removeAward: `${apiUrl}/admin/activity/removeAward`
    },
    lotto: {
        list: `${apiUrl}/admin/lotto/list`,
        setStatus: `${apiUrl}/admin/lotto/setStatus`,
        sendRedPacket: `${apiUrl}/admin/lotto/sendRedPacket`
    },
    manager: {
        list: `${apiUrl}/admin/manager/list`,
        add: `${apiUrl}/admin/manager/add`,
        update: `${apiUrl}/admin/manager/update`,
        remove: `${apiUrl}/admin/manager/remove`,
        resetPassword: `${apiUrl}/admin/manager/resetPassword`
    },
    user: {
        list: `${apiUrl}/admin/user/list`,
        setLottoCount: `${apiUrl}/admin/user/setLottoCount`,
    }
};
