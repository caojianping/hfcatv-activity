import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from "@angular/router";
import {Observable} from "rxjs";
import {ManagerService} from "../../ts/services";

@Injectable({
	providedIn: "root"
})
export class AuthGuard implements CanActivate {
	constructor(
		private managerService: ManagerService,
		private router: Router
	) {
	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		console.log("AuthGuard url:", state, state.url);
		return this.checkLogin(state.url);
	}

	checkLogin(url: string): boolean {
		if (this.managerService.loginStatus) return true;

		this.managerService.redirectUrl = url;
		this.router.navigateByUrl("/login");
		return false;
	}
}
