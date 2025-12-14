import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private TOKEN_KEY = 'token';
  private ROLE_KEY = 'role';

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  setRole(role: 'USER' | 'ADMIN') {
    localStorage.setItem(this.ROLE_KEY, role);
  }

  getRole(): 'USER' | 'ADMIN' | null {
    return localStorage.getItem(this.ROLE_KEY) as any;
  }

  clearRole() {
    localStorage.removeItem(this.ROLE_KEY);
  }

  logout() {
    this.clearToken();
    this.clearRole();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
