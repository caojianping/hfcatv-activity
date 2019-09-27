import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {tap} from "rxjs/operators";
import {Urls} from "../common/urls";
import {TokenHelper} from "../helpers";
import HttpService from "./http.service";

@Injectable({
	providedIn: "root"
})
export class ManagerService {
	public loginStatus: boolean = false;
	public redirectUrl: string = "";

	constructor(private httpService: HttpService) {
	}

	login(username: string, password: string): Observable<boolean> {
		return this.httpService.post<any>(Urls.account.login, {username: username, password: password})
			.pipe(
				tap((data: any) => {
					this.loginStatus = true;
					TokenHelper.setToken(data.token);
					return of(true);
				})
			);
	}

	logout(): Observable<boolean> {
		return this.httpService.get<boolean>(Urls.account.logout)
			.pipe(
				tap((data: boolean) => {
					this.loginStatus = false;
					TokenHelper.removeToken();
					return of(true);
				})
			);
	}

	setPassword(password: string): Observable<boolean> {
		return this.httpService.post<any>(Urls.account.setPassword, {password: password})
			.pipe(
				tap((data: boolean) => {
					if (data) {
						this.loginStatus = false;
						TokenHelper.removeToken();
					}
					return of(data);
				})
			);
	}

	getTokenStatus(): Observable<boolean> {
		return this.httpService.get<boolean>(Urls.token.status);
	}

	refreshTokenStatus(): Observable<any> {
		return this.httpService.get<boolean>(Urls.token.refresh)
			.pipe(
				tap((data: any) => {
					this.loginStatus = true;
					TokenHelper.setToken(data.token);
					return of(true);
				})
			);
	}
}
