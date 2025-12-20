import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FlightService } from '../core/services/flight.service';
import { AuthService } from '../core/services/auth.service';
import { Flight } from '../shared/models/flight.model';

@Component({
  selector: 'app-all-flights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-flights.html',
  styleUrls: ['./all-flights.css']
})
export class AllFlightsComponent implements OnInit {

  flights: Flight[] = [];
  loading = true;
  error = '';

  constructor(
    private flightService: FlightService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.flightService.getAllFlights().subscribe({
      next: res => {
        this.flights = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load flights';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  bookFlight(flight: Flight): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.router.navigate(['/booking', flight.id]);
  }
}
