import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./pages/login/login.component";
import {AwardComponent} from "./pages/award/award.component";
import {ActivityComponent} from "./pages/activity/activity.component";
import {LottoComponent} from "./pages/lotto/lotto.component";
import {ManagerComponent} from "./pages/manager/manager.component";
import {UserComponent} from "./pages/user/user.component";
import {PasswordComponent} from "./pages/password/password.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
	{path: '', pathMatch: "full", redirectTo: "/award"},
	{path: "login", component: LoginComponent},
	{path: "award", component: AwardComponent, canActivate: [AuthGuard]},
	{path: "activity", component: ActivityComponent, canActivate: [AuthGuard]},
	{path: "lotto", component: LottoComponent, canActivate: [AuthGuard]},
  {path: "manager", component: ManagerComponent, canActivate: [AuthGuard]},
  {path: "user", component: UserComponent, canActivate: [AuthGuard]},
  {path: "password", component: PasswordComponent, canActivate: [AuthGuard]}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {useHash: true})],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
