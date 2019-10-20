import {UserService} from "../app/services";
import Database from "../db";

Database.connect();

const userService = new UserService();

async function addUser() {
    await userService.getUserByWechat("unionId01", "openId01", "曹剑平");
}

async function removeUsers() {
    await userService.model.remove({});
}
