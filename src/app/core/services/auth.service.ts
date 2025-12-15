import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = environment.apiBaseUrl + '/user-microservice/api';

  constructor(private http: HttpClient, private token: TokenService) {}

 register(user: User): Observable<string> {
  return this.http.post(
    `${this.base}/user/register`,
    user,
    { responseType: 'text' }
  );
}


  login(email: string, password: string, role: 'USER' | 'ADMIN'): Observable<string> {
    const url =
      role === 'ADMIN'
        ? `${this.base}/admin/login`
        : `${this.base}/user/login`;

    return this.http.post(url, { email, password }, { responseType: 'text' }).pipe(
      tap((response: string) => {
  const jwt = response.replace('token: ', '').trim();
  this.token.setToken(jwt);
  this.token.setRole(role);
})

    );
  }

  logout(): void {
    this.token.logout();
  }
}
