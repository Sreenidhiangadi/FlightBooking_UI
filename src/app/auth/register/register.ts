import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  loading = false;
  error = '';
  success = '';
   backendErrors: Record<string, string> = {};
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      role: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }
get hasBackendError(): boolean {
  return !!this.error || Object.keys(this.backendErrors).length > 0;
}

submit(): void {
  this.error = '';
  this.success = '';
  this.backendErrors = {};

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.loading = true;

  this.auth.register(this.form.value).subscribe({
    next: (msg) => {
      this.loading = false;
      this.success = msg || 'Registered successfully. You can login now.';
      setTimeout(() => this.router.navigate(['/login']), 700);
    },
     error: (err) => {
  this.loading = false;

  if (err.status === 400 && err.error && typeof err.error === 'object' && !err.error.message) {
    this.backendErrors = err.error;
    return;
  }

  if (err?.error?.message) {
    this.error = err.error.message;
    return;
  }

  if (typeof err?.error === 'string') {
    this.error = err.error;
    return;
  }

  this.error = 'Registration failed.';
}

      
    });
  }
}
