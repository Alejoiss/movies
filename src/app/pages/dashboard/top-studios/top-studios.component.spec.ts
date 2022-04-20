import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MoviesService } from 'src/app/services/movies/movies.service';

import { TopStudiosComponent } from './top-studios.component';

describe('TopStudiosComponent', () => {
    let component: TopStudiosComponent;
    let fixture: ComponentFixture<TopStudiosComponent>;
    let moviesServiceSpy: jasmine.SpyObj<MoviesService>;
    let el: DebugElement;

    beforeEach(async () => {
        moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['getTopStudios']);
        moviesServiceSpy.getTopStudios.and.returnValue(of({
            "studios": [
                {
                    "name": "Paramount Pictures",
                    "winCount": 6
                },
                {
                    "name": "Warner Bros.",
                    "winCount": 5
                },
                {
                    "name": "Columbia Pictures",
                    "winCount": 7
                },
                {
                    "name": "20th Century Fox",
                    "winCount": 4
                },
                {
                    "name": "MGM",
                    "winCount": 3
                },
                {
                    "name": "Universal Studios",
                    "winCount": 2
                },
                {
                    "name": "Universal Pictures",
                    "winCount": 2
                }
            ]
        }));
        await TestBed.configureTestingModule({
            declarations: [TopStudiosComponent],
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
        fixture = TestBed.createComponent(TopStudiosComponent);
        el = fixture.debugElement;
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Test for content loaded', () => {
        it('should render a table with only 3 rows', () => {
            const rows = el.queryAll(By.css('tbody tr'));
            expect(rows.length).toBe(3);
        });

        it('The first td with text should be "Columbia Pictures"', () => {
            const td = el.query(By.css('tbody tr:first-child td:first-child'));
            expect(td.nativeElement.innerText).toBe('Columbia Pictures');
        });

        it('The last td with text should be "7"', () => {
            const td = el.query(By.css('tbody tr:first-child td:last-child'));
            expect(td.nativeElement.innerText).toBe('7');
        });
    });
});
