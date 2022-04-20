import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MaxMinIntervalPrizes } from 'src/app/models/max-min-interval-prizes';
import { TopStudios } from 'src/app/models/top-studios';
import { Movie } from 'src/app/models/movie';
import { YearsWithMultipleWinners } from 'src/app/models/years-with-multiple-winners';
import { environment } from 'src/environments/environment';
import { MovieData } from 'src/app/models/movie-data';

@Injectable({
    providedIn: 'root'
})
export class MoviesService {

    constructor(
        private http: HttpClient
    ) { }

    getMovies(httpParams: HttpParams): Observable<MovieData> {
        return this.http.get<MovieData>(`${environment.apiUrl}`, {
            params: httpParams
        });
    }

    getYearsWithMultipleWinners(): Observable<YearsWithMultipleWinners> {
        return this.http.get<YearsWithMultipleWinners>(`${environment.apiUrl}`, {
            params: {
                projection: 'years-with-multiple-winners'
            }
        });
    }

    getTopStudios(): Observable<TopStudios> {
        return this.http.get<TopStudios>(`${environment.apiUrl}`, {
            params: {
                projection: 'studios-with-win-count'
            }
        });
    }

    getPrizeInterval(): Observable<MaxMinIntervalPrizes> {
        return this.http.get<MaxMinIntervalPrizes>(`${environment.apiUrl}`, {
            params: {
                projection: 'max-min-win-interval-for-producers'
            }
        });
    }

    getWinnerMovies(httpParams: HttpParams): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${environment.apiUrl}`, {
            params: httpParams
        });
    }
}
