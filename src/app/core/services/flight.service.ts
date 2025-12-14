import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Flight } from '../../shared/models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private readonly BASE_URL = environment.apiBaseUrl + '/api/flights';

  constructor(private http: HttpClient) {}

  searchByAirline(
    fromPlace: string,
    toPlace: string,
    airline?: string
  ): Observable<Flight[]> {

    return this.http.post<Flight[]>(
      `${this.BASE_URL}/search/airline`,
      {
        fromPlace,
        toPlace,
        airline: airline || ''
      }
    );
  }
}
