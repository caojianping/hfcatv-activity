import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {AwardComponent} from "./pages/award/award.component";
import {ActivityComponent} from "./pages/activity/activity.component";
import {LottoComponent} from "./pages/lotto/lotto.component";
import {ManagerComponent} from "./pages/manager/manager.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/welcome'},
  {path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)},
  {path: 'login', component: LoginComponent},
  {path: 'award', component: AwardComponent},
  {path: 'activity', component: ActivityComponent},
  {path: 'lotto', component: LottoComponent},
  {path: 'manager', component: ManagerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
