import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface AuthResponse {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';
  private currentUser: AuthResponse['user'] | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  signup(user: { firstName: string; lastName: string; email: string; password: string; confirmPassword: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/signup`, user)
      .pipe(
        tap(res => {
          localStorage.setItem('user', JSON.stringify(res.user));
          localStorage.setItem('token', res.token);
          this.currentUser = res.user;
        })
      );
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials)
      .pipe(
        tap(res => {
          localStorage.setItem('user', JSON.stringify(res.user));
          localStorage.setItem('token', res.token);
          this.currentUser = res.user;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  autoLogin() {
    const userDataString = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!userDataString || !token) return;

    try {
      this.currentUser = JSON.parse(userDataString);
    } catch (err) {
      console.error('Error parsing user data from localStorage', err);
      this.logout();
    }
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  get userName(): string {
    if (!this.currentUser) return '';
    return `${this.currentUser.firstName} ${this.currentUser.lastName}`;
  }

  get userRole(): string {
    return this.currentUser?.role || '';
  }
}
