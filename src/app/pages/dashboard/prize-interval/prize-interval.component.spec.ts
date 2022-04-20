import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MoviesService } from 'src/app/services/movies/movies.service';

import { PrizeIntervalComponent } from './prize-interval.component';

describe('PrizeIntervalComponent', () => {
    let component: PrizeIntervalComponent;
    let fixture: ComponentFixture<PrizeIntervalComponent>;
    let moviesServiceSpy: jasmine.SpyObj<MoviesService>;
    let el: DebugElement;

    beforeEach(async () => {
        moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['getPrizeInterval']);
        moviesServiceSpy.getPrizeInterval.and.returnValue(of({
            min: [
                {
                    producer: 'Joel Silver',
                    interval: 1,
                    previousWin: 1990,
                    followingWin: 1991
                }
            ],
            max: [
                {
                    producer: 'Matthew Vaughn',
                    interval: 13,
                    previousWin: 2002,
                    followingWin: 2015
                }
            ]
        }));
        await TestBed.configureTestingModule({
            declarations: [PrizeIntervalComponent],
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
        fixture = TestBed.createComponent(PrizeIntervalComponent);
        el = fixture.debugElement;
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Tests of redenred content', () => {
        it('should have two rendered app-table', () => {
            const tables = el.queryAll(By.css('app-table'));
            expect(tables.length).toBe(2);
        });

        it('Producer of maximum table, should be "Matthew Vaughn"', () => {
            const td = el.query(By.css('app-table:first-of-type tbody tr:first-child td:first-child'));
            expect(td.nativeElement.innerText).toBe('Matthew Vaughn');
        });

        it('Producer of minimum table, should be "Joel Silver"', () => {
            const td = el.query(By.css('app-table:last-of-type tbody tr:first-child td:first-child'));
            expect(td.nativeElement.innerText).toBe('Joel Silver');
        });
    });
});
