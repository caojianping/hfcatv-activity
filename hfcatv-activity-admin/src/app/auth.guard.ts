import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from "@angular/router";
import {Observable} from "rxjs";
import {ManagerService} from "../ts/services";

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private managerService: ManagerService
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.checkStatus(state.url);
    }

    checkStatus(url: string): boolean {
        if (this.managerService.loginStatus) return true;

        this.managerService.redirectUrl = url;
        this.router.navigateByUrl("/login");
        return false;
    }
}
