import {Injectable} from '@angular/core';
import {Urls} from "../common/urls";
import HttpService from './http.service';

@Injectable({
    providedIn: 'root'
})
export class ManagerService {
    constructor(private httpService: HttpService) {
    }

    login(username: string, password: string) {
        console.log("login 222:", username, password);
        return this.httpService.post(Urls.account.login, {username: username, password: password});
    }
}
