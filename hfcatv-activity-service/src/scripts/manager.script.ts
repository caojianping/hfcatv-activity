import {ManagerService} from "../services";
import {ManagerDocument} from "../models";
import Database from "../db";

Database.connect();

const managerService = new ManagerService();

// managerService.model.remove({});

// managerService.addManager("caojianping","123456");

// managerService.setPassword({username:"caojianping"},"888999");

managerService.getManager("caojianping")
    .then((manager: ManagerDocument) => {
        let result = manager.validatePassword("888999");
        console.log("result:", result);
    });