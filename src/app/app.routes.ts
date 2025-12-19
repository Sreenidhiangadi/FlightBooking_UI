import { Routes, provideRouter } from '@angular/router';
import { FlightSearchComponent } from './flights/flight-search/flight-search';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { HomeComponent } from './home/home';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'flights', component: FlightSearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
  path: 'all-flights',
  loadComponent: () =>
    import('./all-flights/all-flights')
      .then(m => m.AllFlightsComponent)
},

  {path: 'booking/:flightId',
    loadComponent: () =>
      import('./booking/booking').then(m => m.Booking),
    canActivate: [authGuard]
  },

  { path: '**', redirectTo: 'flights' } 
];


export const routerProviders = provideRouter(routes);
