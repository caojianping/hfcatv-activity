import {UserService} from "../services";
import Database from "../db";

Database.connect();

const userService = new UserService();

// userService.model.remove({});

async function test() {
    await userService.addUser("abcdefghijklmn01", "曹剑平");
    // await userService.addUser("abcdefghijklmn01", "曹剑平");
    await userService.addUser("abcdefghijklmn02", "张婉婉");
}

test();