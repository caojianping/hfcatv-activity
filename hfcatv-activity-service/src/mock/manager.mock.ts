import {ManagerService} from "../app/services";
import Database from "../db";
import {RoleType} from "../common/enums";

Database.connect();

const managerService = new ManagerService();

async function addManager() {
    await managerService.addManager({
        username: "admin",
        password: "admin_2020",
        role: RoleType.Administrator
    });
}

async function setPassword(username: string, password: string) {
    await managerService.setPassword({username: username}, password);
}

addManager();