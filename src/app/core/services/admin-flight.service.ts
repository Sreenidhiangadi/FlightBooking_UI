import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminFlightService {

  private base = environment.apiBaseUrl + '/flight-microservice/api/flight';

  constructor(private http: HttpClient) {}

  addFlight(flight: any): Observable<string> {
    return this.http.post(
      `${this.base}/airline/inventory/add`,
      flight,
      { responseType: 'text' }
    );
  }

  getAllFlights(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/getallflights`);
  }

  updateFlight(id: string, flight: any): Observable<string> {
    return this.http.put(
      `${this.base}/update/${id}`,
      flight,
      { responseType: 'text' }
    );
  }

  deleteFlight(id: string): Observable<string> {
    return this.http.delete(
      `${this.base}/delete/${id}`,
      { responseType: 'text' }
    );
  }
}
