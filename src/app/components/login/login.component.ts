import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    this.error = '';

    if (!this.email || !this.password) {
      this.error = 'Email and password are required';
      return;
    }

    this.loading = true;

    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: (res: any) => {
          this.loading = false;

          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.user.role);
          localStorage.setItem('user', JSON.stringify(res.user));

          if (res.user.role === 'admin') {
            this.router.navigate(['/dashboard']); 
          } else {
            this.router.navigate(['/properties']);
          }
        },
        error: (err) => {
          this.error = err.error?.message || 'Invalid email or password';
          this.loading = false;
        }
      });
  }
}
