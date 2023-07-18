import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {Urls} from "../common/urls";
import {ManagerDocument, PaginateResult} from "../interfaces";
import {TokenHelper} from "../helpers";
import {HttpService} from "./http.service";

@Injectable({
    providedIn: "root"
})
export class ManagerService {
    public loginStatus: boolean = !!TokenHelper.getToken();
    public redirectUrl: string = "";

    constructor(private httpService: HttpService) {
    }

    login(username: string, password: string): Observable<string> {
        return this.httpService.post<string>(Urls.account.login, {username: username, password: password})
        .pipe(
            tap((token: string) => {
                if (token) {
                    this.loginStatus = true;
                    TokenHelper.setToken(token);
                }
                return token;
            })
        );
    }

    logout(): Observable<boolean> {
        return this.httpService.get<boolean>(Urls.account.logout)
        .pipe(
            tap((data: boolean) => {
                if (data) {
                    this.loginStatus = false;
                    TokenHelper.removeToken();
                }
                return data;
            })
        );
    }

    setPassword(password: string): Observable<boolean> {
        return this.httpService.post<boolean>(Urls.account.setPassword, {password: password})
        .pipe(
            tap((data: boolean) => {
                if (data) {
                    this.loginStatus = false;
                    TokenHelper.removeToken();
                }
                return data;
            })
        );
    }

    getTokenStatus(): Observable<boolean> {
        return this.httpService.get<boolean>(Urls.token.status);
    }

    refreshTokenStatus(): Observable<string> {
        return this.httpService.get<string>(Urls.token.refresh)
        .pipe(
            tap((token: string) => {
                if (token) {
                    this.loginStatus = true;
                    TokenHelper.setToken(token);
                }
                return token;
            })
        );
    }

    getPageManagers(conditions: any, page: number, limit: number): Observable<PaginateResult<ManagerDocument>> {
        return this.httpService.post<PaginateResult<ManagerDocument>>(`${Urls.manager.list}/${page}/${limit}`, conditions);
    }

    addManager(manager: ManagerDocument): Observable<ManagerDocument> {
        return this.httpService.post<ManagerDocument>(Urls.manager.add, manager);
    }

    updateManager(manager: ManagerDocument): Observable<ManagerDocument> {
        return this.httpService.post<ManagerDocument>(Urls.manager.update, manager);
    }

    removeManager(id: string): Observable<boolean> {
        return this.httpService.post<ManagerDocument>(Urls.manager.remove, {id: id});
    }

    resetPassword(id: string): Observable<boolean> {
        return this.httpService.post<boolean>(Urls.manager.resetPassword, {id: id});
    }
}
