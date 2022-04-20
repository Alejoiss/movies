import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { LoaderModule } from 'src/app/components/loader/loader.module';
import { TableModule } from 'src/app/components/table/table.module';
import { YesNoModule } from 'src/app/pipes/yes-no/yes-no.module';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';


@NgModule({
    declarations: [
        ListComponent
    ],
    imports: [
        CommonModule,
        ListRoutingModule,
        PaginationModule.forRoot(),
        FormsModule,
        LoaderModule,
        TableModule,
        ReactiveFormsModule,
        YesNoModule
    ]
})
export class ListModule { }
