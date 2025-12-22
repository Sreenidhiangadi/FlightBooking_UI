import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookingService } from '../core/services/booking.services';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket.html',
  styleUrls: ['./ticket.css']
})
export class TicketComponent implements OnInit {

  ticket: any;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const pnr = this.route.snapshot.paramMap.get('pnr')!;

    this.bookingService.getTicketByPnr(pnr).subscribe({
      next: res => {
        this.ticket = res;
        console.log(res);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Ticket not found';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
