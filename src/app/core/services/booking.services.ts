import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Passenger, TripType } from '../../shared/models/booking.models';


@Injectable({ providedIn: 'root' })
export class BookingService {

  private base = environment.apiBaseUrl + '/booking-microservice/api/flight';

  constructor(private http: HttpClient) {}

  bookFlight(
    flightId: string,
    passengers: Passenger[],
    tripType: TripType,
    returnFlightId?: string
  ): Observable<string> {

    const body = {
      tripType,
      returnFlightId: returnFlightId ?? null,
      passengers
    };

    return this.http.post(
      `${this.base}/booking/${flightId}`,
      body,
      { responseType: 'text' }
    );
  }

  getMyBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/booking/history`);
  }

  cancelBooking(pnr: string): Observable<string> {
    return this.http.delete(
      `${this.base}/booking/cancel/${pnr}`,
      { responseType: 'text' }
    );
  }
  getTicketByPnr(pnr: string) {
  return this.http.get(
    `${this.base}/ticket/${pnr}`
  );
}

}
