import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { map, Observable, shareReplay } from 'rxjs';
import { TopStudios } from 'src/app/models/top-studios';
import { MoviesService } from 'src/app/services/movies/movies.service';

@Component({
    selector: 'app-top-studios',
    templateUrl: './top-studios.component.html',
    styleUrls: ['./top-studios.component.scss']
})
export class TopStudiosComponent implements OnInit {
    data$!: Observable<TopStudios>;

    constructor(
        private moviesService: MoviesService
    ) { }

    ngOnInit(): void {
        this.data$ = this.moviesService.getTopStudios()
            .pipe(
                map(topStudios => this.filterTopStudios(topStudios)),
                shareReplay(),
            );
    }

    filterTopStudios(topStudios: TopStudios): TopStudios {
        topStudios.studios = _.orderBy(topStudios.studios, ['winCount'], ['desc']).slice(0, 3);
        return topStudios;
    }
}
