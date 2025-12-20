import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../core/services/booking.services';
import { FlightService } from '../core/services/flight.service';

@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-history.html',
  styleUrl: './booking-history.css',
})
export class BookingHistoryComponent implements OnInit {

  bookings: any[] = [];
  loading = true;

  showCancelPopup = false;
  selectedBooking: any = null;

  constructor(
    private bookingService: BookingService,
    private flightService: FlightService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.bookingService.getMyBookings().subscribe({
      next: res => {
        this.bookings = res;
        this.loading = false;

        this.bookings.forEach(b => this.attachDepartureTime(b));
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private attachDepartureTime(booking: any) {
    if (!booking?.departureFlightId) return;

    this.flightService.getAllFlights().subscribe(flights => {
      const flight = flights.find(
        f => f.id === booking.departureFlightId
      );

      if (flight) {
        booking.departureTime = flight.departureTime;
        this.cdr.detectChanges();
      }
    });
  }


  openCancelPopup(booking: any) {
    this.selectedBooking = booking;
    this.showCancelPopup = true;
  }

  closeCancelPopup() {
    this.showCancelPopup = false;
    this.selectedBooking = null;
  }

  confirmCancel() {
    if (!this.selectedBooking) return;

    const booking = this.selectedBooking;
    booking.canceling = true;
    booking.cancelMessage = null;

    this.bookingService.cancelBooking(booking.pnr).subscribe({
      next: msg => {
        booking.cancelMessage = msg;
        booking.canceled = true;
        booking.canceling = false;
        this.closeCancelPopup();
        this.cdr.detectChanges();
      },
      error: err => {
        booking.cancelMessage = err?.error || 'Cancellation failed';
        booking.canceling = false;
        this.closeCancelPopup();
        this.cdr.detectChanges();
      }
    });
  }

  canShowCancel(booking: any): boolean {
    if (booking.canceled || !booking.departureTime) return false;
    return new Date(booking.departureTime).getTime() > Date.now();
  }
}
