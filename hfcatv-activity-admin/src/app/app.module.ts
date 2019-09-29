import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppRoutingModule} from "./app-routing.module";

import {AppComponent} from "./app.component";
import {IconsProviderModule} from "./icons-provider.module";
import {NgZorroAntdModule, NZ_I18N, zh_CN} from "ng-zorro-antd";
import {NzMessageModule} from "ng-zorro-antd/message";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {registerLocaleData} from "@angular/common";
import zh from "@angular/common/locales/zh";

import {LoginComponent} from "./pages/login/login.component";
import {AwardComponent} from "./pages/award/award.component";
import {ActivityComponent} from "./pages/activity/activity.component";
import {LottoComponent} from "./pages/lotto/lotto.component";
import {ManagerComponent} from "./pages/manager/manager.component";

import {LayoutComponent} from "./components/layout/layout.component";
import {AwardModalComponent} from "./components/award-modal/award-modal.component";
import {ActivityModalComponent} from "./components/activity-modal/activity-modal.component";

registerLocaleData(zh);

@NgModule({
	declarations: [
		AppComponent,

		LoginComponent,
		AwardComponent,
		ActivityComponent,
		LottoComponent,
		ManagerComponent,

		LayoutComponent,
		AwardModalComponent,
		ActivityModalComponent
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
		BrowserAnimationsModule
	],
	providers: [{provide: NZ_I18N, useValue: zh_CN}],
	bootstrap: [AppComponent]
})
export class AppModule {
}
