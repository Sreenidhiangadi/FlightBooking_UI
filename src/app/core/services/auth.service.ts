import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private base = environment.apiBaseUrl + '/user-microservice/api';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<string> {
    return this.http.post(
      `${this.base}/user/register`,
      user,
      { responseType: 'text' }
    );
  }


  login(
    email: string,
    password: string,
    role: 'USER' | 'ADMIN'
  ): Observable<string> {

    const url =
      role === 'ADMIN'
        ? `${this.base}/admin/login`
        : `${this.base}/user/login`;

    return this.http
      .post(url, { email, password }, { responseType: 'text' })
      .pipe(
        tap((response: string) => {
          const jwt = response.replace('token:', '').trim();
          localStorage.setItem('token', jwt);
          localStorage.setItem('role', role);
        })
      );
  }


  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): 'USER' | 'ADMIN' | null {
    return localStorage.getItem('role') as any;
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  isUser(): boolean {
    return this.getRole() === 'USER';
  }
  getProfile(): Observable<any> {
  return this.http.get(`${this.base}/me`);
}
changePassword(payload: {
  currentPassword: string;
  newPassword: string;
}): Observable<any> {
  return this.http.put(
    `${this.base}/user/change-password`,
    payload
  );
}

  
}
