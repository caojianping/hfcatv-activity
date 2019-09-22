import {UserService} from "../services";
import Database from "../db";

Database.connect();

const userService = new UserService();

async function addUsers() {
    await userService.addUser("abcdefghijklmn01", "曹剑平");
    await userService.addUser("abcdefghijklmn02", "张婉婉");
}

async function removeUsers() {
    await userService.model.remove({});
}
