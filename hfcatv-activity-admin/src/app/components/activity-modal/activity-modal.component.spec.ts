import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ActivityModalComponent} from './activity-modal.component';

describe('AwardModalComponent', () => {
    let component: ActivityModalComponent;
    let fixture: ComponentFixture<ActivityModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ActivityModalComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActivityModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
