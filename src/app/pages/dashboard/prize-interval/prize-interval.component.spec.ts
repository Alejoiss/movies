import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeIntervalComponent } from './prize-interval.component';

describe('PrizeIntervalComponent', () => {
    let component: PrizeIntervalComponent;
    let fixture: ComponentFixture<PrizeIntervalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PrizeIntervalComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PrizeIntervalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
