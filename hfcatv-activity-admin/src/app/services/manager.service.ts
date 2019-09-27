import {Injectable} from '@angular/core';
import {Urls} from "../common/urls";
import HttpService from './http.service';

@Injectable({
    providedIn: 'root'
})
export class ManagerService {
    loginStatus: boolean = false;

    redirectUrl: string = "";

    constructor(private httpService: HttpService) {
    }

    login(username: string, password: string): Observable<boolean> {
        console.log("login 222:", username, password);
        return this.httpService.post(
            Urls.account.login,
            {username: username, password: password}
        ).pipe(
            tap(value => {
                console.log("login 333:", value);
                // this.loginStatus = true;
            })
        );
    }

    logout(): void {
        this.loginStatus = false;
        Token.removeToken();
    }
}
