import {NgModule} from '@angular/core';
import {TestRoutingModule} from './test-routing.module';
import {TestComponent} from './test.component';

@NgModule({
	imports: [TestRoutingModule],
	declarations: [TestComponent],
	exports: [TestComponent]
})
export class TestModule {
}
