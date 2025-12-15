import { Routes, provideRouter } from '@angular/router';
import { FlightSearchComponent } from './flights/flight-search/flight-search';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { HomeComponent } from './home/home';

export const routes: Routes = [
  {  path: '', component: HomeComponent },
  { path: 'flights', component: FlightSearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'flights' }
];

export const routerProviders = provideRouter(routes);
