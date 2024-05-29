import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PhonelistComponent } from './components/phonelist/phonelist.component';

export const routes: Routes = [
    { path: '', component: PhonelistComponent }
];
