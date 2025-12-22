import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AdminFlightService } from '../core/services/admin-flight.service';

@Component({
  selector: 'app-admin-flights',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './manage-flights.html',
  styleUrls: ['./manage-flights.css']
})
export class ManageFlightsComponent implements OnInit {

  flights: any[] = [];

  showDeleteModal = false;
  flightToDelete: string | null = null;

  successMessage = '';
  showSuccess = false;

  constructor(
    private flightService: AdminFlightService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadFlights();
  }

  loadFlights() {
    this.flightService.getAllFlights().subscribe(res => {
      this.flights = [...res];
      this.cd.detectChanges();
    });
  }

  editFlight(id: string) {
    this.router.navigate(['/admin/flights/edit', id]);
  }
  deleteFlight(id: string) {
    this.flightToDelete = id;
    this.showDeleteModal = true;
  }
confirmDelete() {
  if (!this.flightToDelete) return;

  this.flightService.deleteFlight(this.flightToDelete).subscribe(() => {
    this.successMessage = 'Flight deleted successfully';
    this.showSuccess = true;

    this.loadFlights();
    this.showDeleteModal = false;
    this.flightToDelete = null;

    this.cd.detectChanges();

    setTimeout(() => {
      this.showSuccess = false;
      this.cd.detectChanges();
    }, 2500);
  });
}

  cancelDelete() {
    this.showDeleteModal = false;
    this.flightToDelete = null;
  }
}
