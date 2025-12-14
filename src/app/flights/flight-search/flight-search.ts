import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { FlightService } from '../../core/services/flight.service';
import { Flight } from '../../shared/models/flight.model';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './flight-search.html',
  styleUrls: ['./flight-search.css']
})
export class FlightSearchComponent {
  loading = false;
  error = '';
  flights: Flight[] = [];

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private flightService: FlightService
  ) {
    this.form = this.fb.group({
      fromPlace: ['', [Validators.required, Validators.minLength(2)]],
      toPlace: ['', [Validators.required, Validators.minLength(2)]],
      airline: [''] 
    });
  }

  search(): void {
    this.error = '';
    this.flights = [];

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { fromPlace, toPlace, airline } = this.form.value as {
      fromPlace: string;
      toPlace: string;
      airline: string;
    };

    this.loading = true;

    this.flightService
      .searchByAirline(
        fromPlace.trim(),
        toPlace.trim(),
        (airline || '').trim()
      )
      .subscribe({
        next: (res: Flight[]) => {
          this.loading = false;
          this.flights = res;
        },
        error: (err: any) => {
          this.loading = false;
          this.error =
            err?.error || 'Failed to fetch flights. Check gateway route/security.';
        }
      });
  }
}
