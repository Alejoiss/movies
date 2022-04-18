import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { map, Observable, shareReplay } from 'rxjs';
import { TopStudios } from 'src/app/models/top-studios';
import { WinnerMovie } from 'src/app/models/winner-movies';
import { MoviesService } from 'src/app/services/movies/movies.service';

@Component({
    selector: 'app-movies-by-year',
    templateUrl: './movies-by-year.component.html',
    styleUrls: ['./movies-by-year.component.scss']
})
export class MoviesByYearComponent implements OnInit {
    data$!: Observable<WinnerMovie[]>;
    currentYear = new Date().getFullYear();
    form!: FormGroup;

    constructor(
        private moviesService: MoviesService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.getWinnerMovies(this.currentYear);

        this.form = this.formBuilder.group({
            year: [this.currentYear, [Validators.required]]
        });
    }

    getWinnerMovies(year: number): void {
        const httpParams = new HttpParams()
            .set('winner', true)
            .set('year', year);
        this.data$ = this.moviesService.getWinnerMovies(httpParams)
            .pipe(
                shareReplay(),
            );
    }

    search(): void {
        if (this.form.valid) {
            this.getWinnerMovies(this.form.controls['year'].value);
        } else {
            this.form.markAllAsTouched();
        }
    }
}
