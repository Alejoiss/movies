import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MoviesService } from 'src/app/services/movies/movies.service';

import { MoviesByYearComponent } from './movies-by-year.component';

describe('MoviesByYearComponent', () => {
    let component: MoviesByYearComponent;
    let fixture: ComponentFixture<MoviesByYearComponent>;
    let moviesServiceSpy: jasmine.SpyObj<MoviesService>;
    let el: DebugElement;

    beforeEach(async () => {
        moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['getWinnerMovies']);
        moviesServiceSpy.getWinnerMovies.and.returnValue(of([
            {
                id: 197,
                year: 2018,
                title: 'Holmes & Watson',
                studios: [
                    'Columbia Pictures'
                ],
                producers: [
                    'Adam McKay',
                    'Clayton Townsend',
                    'Jimmy Miller',
                    'Will Ferrell'
                ],
                winner: true
            }
        ]));
        await TestBed.configureTestingModule({
            declarations: [MoviesByYearComponent],
            imports: [
                HttpClientTestingModule,
                ReactiveFormsModule
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
        fixture = TestBed.createComponent(MoviesByYearComponent);
        el = fixture.debugElement;
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should call the service on ngOnInit', () => {
        expect(moviesServiceSpy.getWinnerMovies).toHaveBeenCalledTimes(1);
    });

    describe('Tests of redenred content', () => {
        it('First td with text should be "197"', () => {
            const td = el.query(By.css('tbody tr:first-child td:first-child'));
            expect(td.nativeElement.innerText).toBe('197');
        });

        it('Second td with text should be "2018"', () => {
            const td = el.query(By.css('tbody tr:first-child td:nth-child(2)'));
            expect(td.nativeElement.innerText).toBe('2018');
        });

        it('Last td with text should be "Holmes & Watson"', () => {
            const td = el.query(By.css('tbody tr:first-child td:last-child'));
            expect(td.nativeElement.innerText).toBe('Holmes & Watson');
        });
    });

    describe('Test of calls from moviesService', () => {
        it('If form has a invalid value, don\'t should call the service', () => {
            component.form.controls['year'].setValue(1800);
            component.search();
            expect(moviesServiceSpy.getWinnerMovies).toHaveBeenCalledTimes(1); // once has been called on ngOnInit, not on the button click
        });

        it('If form not has a value, don\'t should call the service', () => {
            component.form.controls['year'].setValue(null);
            component.search();
            expect(moviesServiceSpy.getWinnerMovies).toHaveBeenCalledTimes(1); // once has been called on ngOnInit, not on the button click
        });

        it('If form has a valid value, should call the service', () => {
            component.form.controls['year'].setValue(1990);
            component.search();
            expect(moviesServiceSpy.getWinnerMovies).toHaveBeenCalledTimes(2); // once has been called on ngOnInit, not on the button click
        });
    });
});
