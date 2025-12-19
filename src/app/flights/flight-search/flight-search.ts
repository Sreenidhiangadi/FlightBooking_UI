import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlightService } from '../../core/services/flight.service';
import { Flight } from '../../shared/models/flight.model';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './flight-search.html',
  styleUrls: ['./flight-search.css']
})
export class FlightSearchComponent implements OnInit {

  form!: FormGroup;
  flights: Flight[] = [];
  loading = false;
  searched = false;
  error = '';
  minDate: string = '';

  constructor(
    private fb: FormBuilder,
    private flightService: FlightService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];
    this.minDate = today;

    this.form = this.fb.group({
      fromPlace: ['', Validators.required],
      toPlace: ['', Validators.required],
      searchType: ['AIRLINE'],
      airline: [''],
      date: ['']
    });
  }

  search(): void {
    this.searched = true;
    this.error = '';
    this.flights = [];

    if (this.form.invalid) return;

    const { fromPlace, toPlace, searchType, airline, date } = this.form.value;

    this.loading = true;
    this.cdr.detectChanges(); 

    if (searchType === 'AIRLINE') {
      this.flightService
        .searchByAirline(fromPlace.trim(), toPlace.trim(), airline.trim())
        .subscribe(this.handleResponse());
    }

    if (searchType === 'DATE') {
      this.flightService
        .search(fromPlace.trim(), toPlace.trim(), date)
        .subscribe(this.handleResponse());
    }
  }

  handleResponse() {
    return {
      next: (res: Flight[]) => {
        this.flights = res;
        this.loading = false;
        this.cdr.detectChanges(); 
      },
      error: (err: any) => {
        this.loading = false;
        this.error = err?.error || 'Failed to fetch flights';
        this.cdr.detectChanges(); 
      }
    };
  }

 bookFlight(flight: Flight): void {
  console.log('Book clicked', flight);

  if (!this.authService.isLoggedIn()) {
    console.log('Not logged in');
    this.router.navigate(['/login']);
    return;
  }

  console.log('Navigating to booking', flight.id);
  this.router.navigate(['/booking', flight.id]);
}


}
