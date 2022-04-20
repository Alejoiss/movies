import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MoviesService } from 'src/app/services/movies/movies.service';

import { YearsWithMultipleWinnersComponent } from './years-with-multiple-winners.component';

describe('YearsWithMultipleWinnersComponent', () => {
    let component: YearsWithMultipleWinnersComponent;
    let fixture: ComponentFixture<YearsWithMultipleWinnersComponent>;
    let moviesServiceSpy: jasmine.SpyObj<MoviesService>;
    let el: DebugElement;

    beforeEach(async () => {
        moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['getYearsWithMultipleWinners']);
        moviesServiceSpy.getYearsWithMultipleWinners.and.returnValue(of({
            "years": [
                {
                    "year": 1986,
                    "winnerCount": 2
                },
                {
                    "year": 1990,
                    "winnerCount": 2
                },
                {
                    "year": 2015,
                    "winnerCount": 2
                }
            ]
        }));
        await TestBed.configureTestingModule({
            declarations: [YearsWithMultipleWinnersComponent],
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                { provide: MoviesService, useValue: moviesServiceSpy }
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(YearsWithMultipleWinnersComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Tests of redenred content', () => {
        it('Should have rendered a table with 3 rows', () => {
            const tds = el.queryAll(By.css('tbody tr'));
            expect(tds.length).toBe(3);
        });
    });
});
