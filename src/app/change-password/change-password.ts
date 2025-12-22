import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePasswordComponent {

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  successMessage = '';
  errorMessage = '';
  loading = false;

  constructor(private authService: AuthService, private changeDetectorRef: ChangeDetectorRef) {}

  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'New password and confirm password do not match';
      this.changeDetectorRef.detectChanges();
      return;
    }

    this.loading = true;

    this.authService.changePassword({
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    })
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next: () => {
        this.successMessage = 'Password changed successfully';
        this.resetForm();
        this.changeDetectorRef.detectChanges();
      },
error: (err) => {
  if (typeof err?.error === 'string') {
    this.errorMessage = err.error.replace(/^.*?\"|\"$/g, '');
  } else if (err?.error?.message) {
    this.errorMessage = err.error.message;
  } else if (err?.error?.newPassword) {
    this.errorMessage = err.error.newPassword;
  } else {
    this.errorMessage = 'Failed to change password';
  }

  this.changeDetectorRef.detectChanges();
}



    });
  }

  private resetForm() {
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }
}
