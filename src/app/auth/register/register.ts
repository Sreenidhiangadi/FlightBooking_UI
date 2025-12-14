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

  form!: FormGroup; // declare first

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    // initialize AFTER fb is available
    this.form = this.fb.group({
      role: ['USER', Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['MALE', Validators.required],
      age: [18, [Validators.required, Validators.min(1), Validators.max(120)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  submit() {
    this.error = '';
    this.success = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { role, ...payload } = this.form.value as any;
    this.loading = true;

    this.auth.register(payload, role).subscribe({
      next: (msg) => {
        this.loading = false;
        this.success = msg || 'Registered successfully. You can login now.';
        setTimeout(() => this.router.navigate(['/login']), 700);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error || 'Registration failed.';
      }
    });
  }
}
