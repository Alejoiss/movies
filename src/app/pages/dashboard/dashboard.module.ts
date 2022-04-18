import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from 'src/app/components/loader/loader.module';
import { TableModule } from 'src/app/components/table/table.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MoviesByYearComponent } from './movies-by-year/movies-by-year.component';
import { PrizeIntervalComponent } from './prize-interval/prize-interval.component';
import { TopStudiosComponent } from './top-studios/top-studios.component';
import { YearsWithMultipleWinnersComponent } from './years-with-multiple-winners/years-with-multiple-winners.component';


@NgModule({
    declarations: [
        DashboardComponent,
        YearsWithMultipleWinnersComponent,
        TopStudiosComponent,
        PrizeIntervalComponent,
        MoviesByYearComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        LoaderModule,
        TableModule,
        ReactiveFormsModule
    ]
})
export class DashboardModule { }
