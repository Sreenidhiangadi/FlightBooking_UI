import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = environment.apiBaseUrl + '/api';

  constructor(private http: HttpClient, private token: TokenService) {}

  register(user: User, role: 'USER' | 'ADMIN'): Observable<string> {
    const url = role === 'ADMIN' ? `${this.base}/admin/register` : `${this.base}/user/register`;
    return this.http.post(url, user, { responseType: 'text' });
  }

  login(email: string, password: string, role: 'USER' | 'ADMIN'): Observable<string> {
    const url = role === 'ADMIN' ? `${this.base}/admin/login` : `${this.base}/user/login`;
    return this.http.post(url, { email, password }, { responseType: 'text' }).pipe(
      tap((jwt: string) => {
        this.token.setToken(jwt);
        this.token.setRole(role);
      })
    );
  }

  logout() {
    this.token.logout();
  }
}
