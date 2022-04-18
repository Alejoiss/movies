import { Component, OnInit } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { MaxMinIntervalPrizes } from 'src/app/models/max-min-interval-prizes';
import { MoviesService } from 'src/app/services/movies/movies.service';

@Component({
    selector: 'app-prize-interval',
    templateUrl: './prize-interval.component.html',
    styleUrls: ['./prize-interval.component.scss']
})
export class PrizeIntervalComponent implements OnInit {
    data$!: Observable<MaxMinIntervalPrizes>;

    constructor(
        private moviesService: MoviesService
    ) { }

    ngOnInit(): void {
        this.data$ = this.moviesService.getPrizeInterval()
            .pipe(
                shareReplay(),
            );
    }
}
