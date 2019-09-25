import {UserService, ActivityService, LottoService} from "../src/services";
import Database from "../src/db";

Database.connect();

const userService = new UserService();
const activityService = new ActivityService();
const lottoService = new LottoService();

async function addLotto() {
    let user = await userService.getUserByOpenId("abcdefghijklmn01");// 曹剑平
    if (!user) return;

    let activity = await activityService.getActivity();
    if (!activity) return;

    await lottoService.addLotto(user._id, activity._id);
}

async function removeLottos() {
    await lottoService.model.remove({});
}

addLotto()
    .then(() => {
    })
    .catch(err => console.log("addLotto err:", err));
