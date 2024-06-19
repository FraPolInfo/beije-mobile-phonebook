import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PhonelistComponent } from './components/phonelist/phonelist.component';
import { numberResolver } from './services/phone-list.resolver';
import { loginGuard } from './services/login-guard.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomepageComponent
    },
    {
        path: 'phonelist',
        component: PhonelistComponent,
        resolve: {numberResolver},
        canActivate: [loginGuard]
    }
];
