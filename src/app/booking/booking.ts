import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { BookingService } from '../core/services/booking.services';
import { Passenger, TripType } from '../shared/models/booking.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.html',
  styleUrls: ['./booking.css']
})
export class Booking implements OnInit {

  flightId!: string;
  returnFlightId?: string;

  tripType: TripType = 'ONE_WAY';

  passengers: Passenger[] = [
    {
      name: '',
      age: 0,
      gender: 'MALE',
      seatNumber: ''
    }
  ];

  successMessage = '';
  errorMessage = '';
  isBooking = false;
  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

 ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('flightId');
  if (id) {
    this.flightId = id;
    this.errorMessage = '';
  }
}


  addPassenger(): void {
    this.passengers.push({
      name: '',
      age: 0,
      gender: 'MALE',
      seatNumber: ''
    });
  }

  removePassenger(index: number): void {
    if (this.passengers.length > 1) {
      this.passengers.splice(index, 1);
    }
  }
 private getBookingSignature(): string {
    return JSON.stringify({
      flightId: this.flightId,
      tripType: this.tripType,
      returnFlightId: this.returnFlightId ?? null,
      passengers: this.passengers.map(p => ({
        name: p.name,
        age: p.age,
        gender: p.gender,
        seatNumber: p.seatNumber
      }))
    });
  }
confirmBooking(): void {
  if (this.isBooking) return;

 

  this.isBooking = true;
  this.errorMessage = '';

  this.bookingService
    .bookFlight(
      this.flightId,
      this.passengers,
      this.tripType,
      this.tripType === 'ROUND_TRIP' ? this.returnFlightId : undefined
    )
    .subscribe({
      next: (res: any) => {

  let pnr: string | null = null;

  if (typeof res === 'string') {
    pnr = res.replace('PNR:', '').trim();
  }
  if (!pnr && res?.pnr) {
    pnr = res.pnr;
  }

  if (!pnr) {
    this.errorMessage = 'Booking completed but PNR not found';
    this.isBooking = false;
    return;
  }

  
  this.isBooking = false;

  this.router.navigate(['/ticket', pnr]);
}
,
      error: (err: HttpErrorResponse) => {
        this.errorMessage =
          err.error?.message ||
          err.error ||
          'Booking failed. Please try again.';

        this.isBooking = false;
        this.cdr.detectChanges();
      }
    });
}


}


