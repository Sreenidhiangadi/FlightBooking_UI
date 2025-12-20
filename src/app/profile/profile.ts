import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {

  loading = true;
  error = '';
  user: any = null;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
this.auth.getProfile().subscribe({
    next: (res) => {
      this.user = res;
      this.loading = false;
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Profile API error:', err);
      this.error = 'Failed to load profile';
      this.loading = false;
      this.cdr.detectChanges();
    }
  });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
