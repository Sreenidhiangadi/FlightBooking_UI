import { Routes, provideRouter } from '@angular/router';
import { FlightSearchComponent } from './flights/flight-search/flight-search';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { HomeComponent } from './home/home';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';

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
{
  path: 'ticket/:pnr',
  loadComponent: () =>
    import('./ticket/ticket')
      .then(m => m.TicketComponent)
},
{
  path: 'profile',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./profile/profile')
      .then(m => m.ProfileComponent)
},
{   path: 'booking/:flightId',
    loadComponent: () =>
      import('./booking/booking').then(m => m.Booking),
    canActivate: [authGuard]
  },
{
  path: 'my-bookings',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./booking-history/booking-history')
      .then(m => m.BookingHistoryComponent)
},
{
  path: 'admin',
  canActivate: [authGuard, adminGuard],
  children: [
    {
      path: 'add-flight',
      loadComponent: () =>
        import('./add-flight/add-flight')
          .then(m => m.AddFlight)
    },
    {
      path: 'manage-flights',
      loadComponent: () =>
        import('./manage-flights/manage-flights')
          .then(m => m.ManageFlightsComponent)
    }
  ]
},
{
  path: 'change-password',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./change-password/change-password')
      .then(m => m.ChangePasswordComponent)
},
{ path: '**', redirectTo: 'flights' } 
];


export const routerProviders = provideRouter(routes);
