import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

type UserRole = 'USER' | 'ADMIN';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  loading = false;
  error = '';

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  submit(): void {
    this.error = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    const { role, email, password } = this.form.value as {
      role: UserRole;
      email: string;
      password: string;
    };

    this.loading = true;

    this.auth.login(email, password, role).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/flights']);
      },
     error: (err: any) => {
  this.loading = false;

  if (typeof err?.error === 'string') {
    this.error = err.error;
    return;
  }

  if (err?.error?.message) {
    this.error = err.error.message;
    return;
  }

  this.error = 'Login failed. Please try again.';
}

    });
  }
}
