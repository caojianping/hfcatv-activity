import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from "@angular/router";
import {Observable} from "rxjs";
import {ManagerService} from "../../ts/services";
import TokenHelper from "../../ts/helpers/token.helper";

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
        console.log("AuthGuard url:", state.url);
        return this.checkStatus(state.url);
    }

    checkStatus(url: string): boolean {
        let token = TokenHelper.getToken();
        console.log("AuthGuard token:", token, this.managerService.loginStatus);
        if (token && this.managerService.loginStatus) return true;

        this.managerService.redirectUrl = url;
        this.router.navigateByUrl("/login");
        return false;
    }
}
