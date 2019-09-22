import {ManagerService} from "../services";
import Database from "../db";

Database.connect();

const managerService = new ManagerService();

async function addManager() {
    await managerService.addManager("caojianping", "123456");
}

async function getManager() {
    let manager = await managerService.getManager("caojianping"),
        result = manager.validatePassword("888999");
    console.log("result:", result);
}

async function setPassword() {
    await managerService.setPassword({username: "caojianping"}, "888999");
}

async function removeManagers() {
    await managerService.model.remove({});
}
