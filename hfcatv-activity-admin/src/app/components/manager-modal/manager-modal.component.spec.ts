import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ManagerModalComponent} from './manager-modal.component';

describe('AwardModalComponent', () => {
    let component: ManagerModalComponent;
    let fixture: ComponentFixture<ManagerModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ManagerModalComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ManagerModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
