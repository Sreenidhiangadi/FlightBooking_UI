import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AdminFlightService } from '../core/services/admin-flight.service';

@Component({
  selector: 'app-add-flight',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-flight.html',
  styleUrls: ['./add-flight.css']
})
export class AddFlight {

  flight = {
    airline: '',
    fromPlace: '',
    toPlace: '',
    departureTime: '',
    arrivalTime: '',
    price: 0,
    totalSeats: 0,
    availableSeats: 0
  };

  airlines = [
    'Air India',
    'Air Asia',
    'IndiGo',
    'Vistara',
    'SpiceJet',
    'Akasa Air',
    'Go First'
  ];

  places = [
    'Bangalore',
    'Hyderabad',
    'Delhi',
    'Mumbai',
    'Chennai',
    'Pune',
    'Kolkata',
    'Ahmedabad',
    'Jaipur',
    'Goa'
  ];

  loading = false;
  errorMessage = '';
  successMessage = '';
  showSuccessPopup = false;

  constructor(
    private flightService: AdminFlightService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}
addFlight(form: any) {
  this.errorMessage = '';
  this.successMessage = '';

  if (form.invalid) {
    form.control.markAllAsTouched();
    return;
  }

  if (!this.isValidAirline(this.flight.airline)) {
    this.errorMessage = 'Please select a valid airline from the list';
    return;
  }

  if (!this.isValidPlace(this.flight.fromPlace)) {
    this.errorMessage = 'Please select a valid From location from the list';
    return;
  }

  if (!this.isValidPlace(this.flight.toPlace)) {
    this.errorMessage = 'Please select a valid To location from the list';
    return;
  }

  if (this.flight.fromPlace === this.flight.toPlace) {
    this.errorMessage = 'From and To locations cannot be the same';
    return;
  }

  if (!this.isValidTiming()) {
    this.errorMessage = 'Arrival time must be after departure time';
    return;
  }

  this.flight.availableSeats = this.flight.totalSeats;
  this.loading = true;

  this.flightService.addFlight(this.flight).subscribe({
    next: (msg: string) => {
      this.successMessage = msg;
      this.showSuccessPopup = true;
      this.loading = false;

      this.cd.detectChanges();

      setTimeout(() => {
        this.showSuccessPopup = false;
        this.router.navigate(['/admin/manage-flights']);
      }, 2000);
    },
    error: err => {
      this.errorMessage =
        Array.isArray(err.error?.errors)
          ? err.error.errors[0]
          : err.error?.error || 'Unexpected error occurred';

      this.loading = false;
      this.cd.detectChanges();
    }
  });
}

  isValidAirline(value: string): boolean {
  return this.airlines.includes(value);
}

isValidPlace(value: string): boolean {
  return this.places.includes(value);
}

isValidTiming(): boolean {
  const departure = new Date(this.flight.departureTime).getTime();
  const arrival = new Date(this.flight.arrivalTime).getTime();
  return arrival > departure;
}

}
