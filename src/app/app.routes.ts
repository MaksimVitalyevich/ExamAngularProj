import { Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';

export const routes: Routes = [
    {path: 'body', component: BodyComponent},
    {path: '', redirectTo: 'body', pathMatch: 'full'},
    {path: 'foodTable', component: BodyComponent},
    /*{path: 'additionalInfo', component: AdditionalInfo}*/
];
