import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightService } from '../core/services/flight.service';
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

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.flightService.getAllFlights().subscribe({
      next: res => {
        this.flights = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load flights';
        this.loading = false;
      }
    });
  }
}
