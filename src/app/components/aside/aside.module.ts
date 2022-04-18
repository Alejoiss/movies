import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AsideComponent } from './aside.component';

@NgModule({
    imports: [RouterModule],
    declarations: [AsideComponent],
    exports: [AsideComponent],
})
export class AsideModule { }
