import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppRoutingModule} from "./app-routing.module";

import {AppComponent} from "./app.component";
import {IconsProviderModule} from "./icons-provider.module";
import {NgZorroAntdModule, NZ_I18N, zh_CN} from "ng-zorro-antd";
import {NzMessageModule} from "ng-zorro-antd/message";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {registerLocaleData} from "@angular/common";
import zh from "@angular/common/locales/zh";

import {LoginComponent} from "./pages/login/login.component";
import {AwardComponent} from "./pages/award/award.component";
import {ActivityComponent} from "./pages/activity/activity.component";
import {LottoComponent} from "./pages/lotto/lotto.component";
import {ManagerComponent} from "./pages/manager/manager.component";
import {UserComponent} from "./pages/user/user.component";
import {PasswordComponent} from "./pages/password/password.component";

import {LayoutComponent} from "./components/layout/layout.component";
import {AwardModalComponent} from "./components/award-modal/award-modal.component";
import {ActivityModalComponent} from "./components/activity-modal/activity-modal.component";
import {ManagerModalComponent} from "./components/manager-modal/manager-modal.component";
import {UserModalComponent} from "./components/user-modal/user-modal.component";

registerLocaleData(zh);

@NgModule({
    declarations: [
        AppComponent,

        LoginComponent,
        AwardComponent,
        ActivityComponent,
        LottoComponent,
        ManagerComponent,
        UserComponent,
        PasswordComponent,

        LayoutComponent,
        AwardModalComponent,
        ActivityModalComponent,
        ManagerModalComponent,
        UserModalComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        IconsProviderModule,
        NgZorroAntdModule,
        NzMessageModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        // BrowserAnimationsModule,
        NoopAnimationsModule
    ],
    providers: [{provide: NZ_I18N, useValue: zh_CN}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
