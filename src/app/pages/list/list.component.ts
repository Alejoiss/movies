import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { debounceTime, distinctUntilChanged, filter, map, Observable, shareReplay, tap } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies/movies.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    movies$!: Observable<Movie[]>;
    totalItems = 0;
    currentPage = 1;
    yearControl!: FormControl;
    winnerControl!: FormControl;
    currentYear = new Date().getFullYear();

    constructor(
        private moviesService: MoviesService
    ) { }

    ngOnInit(): void {
        this.yearControl = new FormControl('', [Validators.min(1980), Validators.max(this.currentYear)]);
        this.winnerControl = new FormControl('');
        this.getMovies();
        this.subscribeFormChanges();
    }

    getMovies(): void {
        const httpParams = this.gethttpParams();
        this.movies$ = this.moviesService.getMovies(httpParams)
            .pipe(
                shareReplay(),
                tap(response => this.totalItems = response.totalElements),
                map(response => response.content)
            );
    }

    gethttpParams(): HttpParams {
        const httpParams = new HttpParams()
            .set('size', 10)
            .set('page', this.currentPage - 1)
            .set('winner', this.winnerControl.value)
            .set('year', this.yearControl.value);

        return httpParams;
    }

    subscribeFormChanges(): void {
        this.yearControl.valueChanges
            .pipe(
                filter(() => this.yearControl.valid),
                debounceTime(400),
                distinctUntilChanged(),
                tap(() => this.currentPage = 1)
            )
            .subscribe(() => this.getMovies());

        this.winnerControl.valueChanges
            .pipe(
                tap(() => this.currentPage = 1)
            )
            .subscribe(() => this.getMovies());
    }

    pageChanged(page: PageChangedEvent): void {
        if (this.currentPage !== page.page) {
            this.currentPage = page.page;
            this.getMovies();
        }
    }
}
