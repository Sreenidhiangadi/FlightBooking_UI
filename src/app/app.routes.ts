import { Routes, provideRouter } from '@angular/router';
import { FlightSearchComponent } from './flights/flight-search/flight-search';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';

export const routes: Routes = [
  { path: '', redirectTo: 'flights', pathMatch: 'full' },
  { path: 'flights', component: FlightSearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'flights' }
];

export const routerProviders = provideRouter(routes);
