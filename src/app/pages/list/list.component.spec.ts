import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { of } from 'rxjs';
import { YesNoModule } from 'src/app/pipes/yes-no/yes-no.module';
import { MoviesService } from 'src/app/services/movies/movies.service';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
    let component: ListComponent;
    let fixture: ComponentFixture<ListComponent>;
    let moviesServiceSpy: jasmine.SpyObj<MoviesService>;
    let el: DebugElement;

    beforeEach(async () => {
        moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['getMovies']);
        moviesServiceSpy.getMovies.and.returnValue(of({
            "content": [
                {
                    "id": 1,
                    "year": 1980,
                    "title": "Can't Stop the Music",
                    "studios": [
                        "Associated Film Distribution"
                    ],
                    "producers": [
                        "Allan Carr"
                    ],
                    "winner": true
                },
                {
                    "id": 2,
                    "year": 1980,
                    "title": "Cruising",
                    "studios": [
                        "Lorimar Productions",
                        "United Artists"
                    ],
                    "producers": [
                        "Jerry Weintraub"
                    ],
                    "winner": false
                },
                {
                    "id": 3,
                    "year": 1980,
                    "title": "The Formula",
                    "studios": [
                        "MGM",
                        "United Artists"
                    ],
                    "producers": [
                        "Steve Shagan"
                    ],
                    "winner": false
                },
                {
                    "id": 4,
                    "year": 1980,
                    "title": "Friday the 13th",
                    "studios": [
                        "Paramount Pictures"
                    ],
                    "producers": [
                        "Sean S. Cunningham"
                    ],
                    "winner": false
                },
                {
                    "id": 5,
                    "year": 1980,
                    "title": "The Nude Bomb",
                    "studios": [
                        "Universal Studios"
                    ],
                    "producers": [
                        "Jennings Lang"
                    ],
                    "winner": false
                },
                {
                    "id": 6,
                    "year": 1980,
                    "title": "The Jazz Singer",
                    "studios": [
                        "Associated Film Distribution"
                    ],
                    "producers": [
                        "Jerry Leider"
                    ],
                    "winner": false
                },
                {
                    "id": 7,
                    "year": 1980,
                    "title": "Raise the Titanic",
                    "studios": [
                        "Associated Film Distribution"
                    ],
                    "producers": [
                        "William Frye"
                    ],
                    "winner": false
                },
                {
                    "id": 8,
                    "year": 1980,
                    "title": "Saturn 3",
                    "studios": [
                        "Associated Film Distribution"
                    ],
                    "producers": [
                        "Stanley Donen"
                    ],
                    "winner": false
                },
                {
                    "id": 9,
                    "year": 1980,
                    "title": "Windows",
                    "studios": [
                        "United Artists"
                    ],
                    "producers": [
                        "Mike Lobell"
                    ],
                    "winner": false
                },
                {
                    "id": 10,
                    "year": 1980,
                    "title": "Xanadu",
                    "studios": [
                        "Universal Studios"
                    ],
                    "producers": [
                        "Lawrence Gordon"
                    ],
                    "winner": false
                }
            ],
            "pageable": {
                "sort": {
                    "sorted": false,
                    "unsorted": true,
                    "empty": true
                },
                "pageSize": 10,
                "pageNumber": 0,
                "offset": 0,
                "paged": true,
                "unpaged": false
            },
            "last": false,
            "totalPages": 21,
            "totalElements": 206,
            "first": true,
            "sort": {
                "sorted": false,
                "unsorted": true,
                "empty": true
            },
            "number": 0,
            "numberOfElements": 10,
            "size": 10,
            "empty": false
        }));
        await TestBed.configureTestingModule({
            declarations: [ListComponent],
            imports: [
                HttpClientTestingModule,
                YesNoModule,
                PaginationModule.forRoot(),
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
        fixture = TestBed.createComponent(ListComponent);
        el = fixture.debugElement;
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should call the service on ngOnInit', () => {
        expect(moviesServiceSpy.getMovies).toHaveBeenCalledTimes(1);
    });

    describe('Tests of redenred content', () => {
        it('Should have rendered a table with 10 rows', () => {
            const trs = el.queryAll(By.css('tbody tr'));
            expect(trs.length).toBe(10);
        });

        it('Should have rendered a pagination with 21 pagination itens', () => {
            const items = el.queryAll(By.css('.pagination-page.page-item'));
            expect(items.length).toBe(21);
        });
    });

    describe('Test of calls from moviesService', () => {
        it('If form year has a invalid value, don\'t should call the service', fakeAsync(() => {
            component.yearControl.setValue(1800);
            tick(401);
            expect(moviesServiceSpy.getMovies).toHaveBeenCalledTimes(1); // once has been called on ngOnInit, not on the button click
        }));

        it('If form not has a value, should call the service', fakeAsync(() => {
            component.yearControl.setValue(null);
            tick(401);
            expect(moviesServiceSpy.getMovies).toHaveBeenCalledTimes(2); // once has been called on ngOnInit, not on the button click
        }));

        it('If form has a valid value, should call the service', fakeAsync(() => {
            component.yearControl.setValue(1990);
            tick(401);
            expect(moviesServiceSpy.getMovies).toHaveBeenCalledTimes(2); // once has been called on ngOnInit, not on the button click
        }));

        it('If change the winner select, should call the service', () => {
            component.winnerControl.setValue(true);
            expect(moviesServiceSpy.getMovies).toHaveBeenCalledTimes(2); // once has been called on ngOnInit, not on the button click
        });
    });
});
