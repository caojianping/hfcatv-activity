import {UserService} from "../src/services";
import Database from "../src/db";

Database.connect();

const userService = new UserService();

async function addUsers() {
	await userService.addUser("test01", "曹剑平");
	await userService.addUser("test02", "张婉婉");
}

async function removeUsers() {
	await userService.model.remove({});
}

// addUsers();
