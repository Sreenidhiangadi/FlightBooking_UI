import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../core/services/token.service';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  menuOpen = false;

  constructor(
    public token: TokenService,
    private auth: AuthService,
    private router: Router
  ) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  logout() {
    this.auth.logout();
    this.closeMenu();
    this.router.navigate(['/login']);
  }
   get isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  get isUser(): boolean {
    return this.auth.isUser();
  }
}
