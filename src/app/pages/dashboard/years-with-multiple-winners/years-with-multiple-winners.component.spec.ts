import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearsWithMultipleWinnersComponent } from './years-with-multiple-winners.component';

describe('YearsWithMultipleWinnersComponent', () => {
  let component: YearsWithMultipleWinnersComponent;
  let fixture: ComponentFixture<YearsWithMultipleWinnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearsWithMultipleWinnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearsWithMultipleWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
