import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Flight } from '../../shared/models/flight.model';

@Injectable({ providedIn: 'root' })
export class FlightService {

  private base = environment.apiBaseUrl + '/flight-microservice/api/flight';

  constructor(private http: HttpClient) {}

  searchByAirline(
    fromPlace: string,
    toPlace: string,
    airline: string
  ): Observable<Flight[]> {

    return this.http.post<Flight[]>(
      `${this.base}/search/airline`,
      { fromPlace, toPlace, airline }
    );
  }
   search(fromPlace: string, toPlace: string, date: string): Observable<Flight[]> {
    return this.http.post<Flight[]>(
      `${this.base}/search`,
      { fromPlace, toPlace, date }
    );
  }
  getAllFlights() {
  return this.http.get<Flight[]>(
    `${this.base}/getallflights`
  );
}
getFlightById(id: string): Observable<Flight> {
  return this.http.get<Flight>(
    `${this.base}/${id}`
  );
}


}
