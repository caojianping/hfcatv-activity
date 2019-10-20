import {ManagerService} from "../app/services";
import Database from "../db";

Database.connect();

const managerService = new ManagerService();

async function addManager() {
    await managerService.addManager("admin", "123456");
}

async function setPassword() {
    await managerService.setPassword({username: "admin"}, "123456");
}

async function removeManagers() {
    await managerService.model.remove({});
}
