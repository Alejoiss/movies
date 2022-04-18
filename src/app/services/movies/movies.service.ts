import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MaxMinIntervalPrizes } from 'src/app/models/max-min-interval-prizes';
import { TopStudios } from 'src/app/models/top-studios';
import { WinnerMovie } from 'src/app/models/winner-movies';
import { YearsWithMultipleWinners } from 'src/app/models/years-with-multiple-winners';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MoviesService {

    constructor(
        private http: HttpClient
    ) { }

    getMovies(httpParams: HttpParams): Observable<any> {
        return this.http.get(`${environment.apiUrl}`, {
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

    getWinnerMovies(httpParams: HttpParams): Observable<WinnerMovie[]> {
        return this.http.get<WinnerMovie[]>(`${environment.apiUrl}`, {
            params: httpParams
        });
    }
}
