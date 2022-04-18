import { Component, OnInit } from '@angular/core';
import { finalize, Observable, shareReplay } from 'rxjs';
import { YearsWithMultipleWinners } from 'src/app/models/years-with-multiple-winners';
import { MoviesService } from 'src/app/services/movies/movies.service';

@Component({
    selector: 'app-years-with-multiple-winners',
    templateUrl: './years-with-multiple-winners.component.html',
    styleUrls: ['./years-with-multiple-winners.component.scss']
})
export class YearsWithMultipleWinnersComponent implements OnInit {
    data$!:  Observable<YearsWithMultipleWinners>;

    constructor(
        private moviesService: MoviesService
    ) { }

    ngOnInit(): void {
        this.data$ = this.moviesService.getYearsWithMultipleWinners()
            .pipe(
                shareReplay(),
            );
    }
}
